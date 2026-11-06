import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { generateQRDataUrl } from "@/lib/qr";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { verificationToken: token },
    include: {
      registration: {
        include: {
          ticketType: true,
          event: true,
        },
      },
    },
  });

  if (!ticket) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const qrDataUrl =
    ticket.qrCodeDataUrl ||
    (await generateQRDataUrl(ticket.verificationToken, baseUrl));

  const reg = ticket.registration;

  return (
    <>
      <Header />
      <main className="section-padding">
        <div className="container-narrow max-w-md">
          <div className="rounded-2xl border-2 border-gold bg-white p-6 shadow-lg text-center">
            <p className="font-montserrat text-xs uppercase tracking-widest text-gold">Official Ticket</p>
            <h1 className="mt-2 font-playfair text-2xl font-bold text-charcoal">Frame By Frame 2027</h1>
            <p className="mt-1 text-sm text-charcoal/60 italic">{reg.event.tagline}</p>

            <div className="my-6 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="Ticket QR Code"
                width={200}
                height={200}
                className="rounded-lg border-4 border-gold"
              />
            </div>

            <div className="space-y-2 text-left text-sm">
              <p><span className="text-charcoal/60">Name:</span> <strong>{reg.fullName}</strong></p>
              <p><span className="text-charcoal/60">Ticket:</span> <strong>{ticket.ticketNumber}</strong></p>
              <p><span className="text-charcoal/60">Type:</span> {reg.ticketType.name}</p>
              <p><span className="text-charcoal/60">Reg ID:</span> {reg.registrationId}</p>
              <p><span className="text-charcoal/60">Status:</span>{" "}
                <span className={ticket.status === "VALID" ? "text-green-700 font-medium" : "text-red-600"}>
                  {ticket.status}
                </span>
              </p>
            </div>

            <div className="mt-6 border-t border-charcoal/10 pt-4 text-xs text-charcoal/50">
              <p>23–24 January 2027 · 9:00 AM – 6:00 PM IST</p>
              <p>Suchitra Cinema and Cultural Academy, Bengaluru</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
