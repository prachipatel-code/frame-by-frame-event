import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import {
  generateRegistrationId,
  generateTicketNumber,
  generateSecureToken,
} from "@/lib/utils";
import { generateQRDataUrl } from "@/lib/qr";
import { sendConfirmationEmail } from "@/lib/email";

const registerSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(8).max(20).optional(),
  organization: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  ticketTypeId: z.string().min(1),
  answers: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    if (!event) {
      return NextResponse.json({ error: "No published event found" }, { status: 404 });
    }

    const ticketType = await prisma.ticketType.findFirst({
      where: { id: data.ticketTypeId, eventId: event.id, isActive: true },
    });

    if (!ticketType) {
      return NextResponse.json({ error: "Invalid ticket type" }, { status: 400 });
    }

    const existing = await prisma.registration.findFirst({
      where: {
        eventId: event.id,
        email: data.email.toLowerCase(),
        status: { not: "CANCELLED" },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You are already registered with this email for this event." },
        { status: 409 }
      );
    }

    if (ticketType.capacity && ticketType.soldCount >= ticketType.capacity) {
      return NextResponse.json({ error: "This ticket category is sold out." }, { status: 400 });
    }

    const registrationId = generateRegistrationId("FBF");
    const ticketNumber = generateTicketNumber("TKT-FBF");
    const verificationToken = generateSecureToken(40);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const result = await prisma.$transaction(async (tx) => {
      const registration = await tx.registration.create({
        data: {
          eventId: event.id,
          ticketTypeId: ticketType.id,
          registrationId,
          fullName: data.fullName.trim(),
          email: data.email.toLowerCase().trim(),
          phone: data.phone?.trim(),
          organization: data.organization?.trim(),
          city: data.city?.trim(),
          country: data.country || "India",
          status: "CONFIRMED",
          answers: data.answers || {},
        },
      });

      const ticket = await tx.ticket.create({
        data: {
          registrationId: registration.id,
          ticketNumber,
          verificationToken,
          status: "VALID",
        },
      });

      await tx.ticketType.update({
        where: { id: ticketType.id },
        data: { soldCount: { increment: 1 } },
      });

      return { registration, ticket };
    });

    let qrDataUrl: string | undefined;
    try {
      qrDataUrl = await generateQRDataUrl(verificationToken, baseUrl);
      await prisma.ticket.update({
        where: { id: result.ticket.id },
        data: { qrCodeDataUrl: qrDataUrl },
      });
    } catch (e) {
      console.error("QR generation failed:", e);
    }

    sendConfirmationEmail({
      to: result.registration.email,
      participantName: result.registration.fullName,
      ticketNumber: result.ticket.ticketNumber,
      registrationId: result.registration.registrationId,
      ticketType: ticketType.name,
      qrDataUrl,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      registrationId: result.registration.registrationId,
      ticketNumber: result.ticket.ticketNumber,
      verificationToken: result.ticket.verificationToken,
      ticketType: ticketType.name,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
    }
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
