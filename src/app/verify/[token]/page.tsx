import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { verificationToken: token },
    include: {
      registration: { include: { ticketType: true } },
      checkIns: { orderBy: { checkedInAt: "desc" }, take: 1 },
    },
  });

  if (!ticket) notFound();

  const alreadyCheckedIn = ticket.checkIns.length > 0;

  return (
    <>
      <Header />
      <main className="section-padding">
        <div className="container-narrow max-w-md text-center">
          <div
            className={`rounded-2xl border-2 p-8 shadow-sm ${
              ticket.status === "VALID" && !alreadyCheckedIn
                ? "border-green-500 bg-green-50"
                : ticket.status === "USED" || alreadyCheckedIn
                ? "border-amber-500 bg-amber-50"
                : "border-red-500 bg-red-50"
            }`}
          >
            <h1 className="font-playfair text-2xl font-bold text-charcoal">Ticket Verification</h1>
            <p className="mt-4 text-lg font-semibold">
              {ticket.status === "VALID" && !alreadyCheckedIn
                ? "VALID — Ready for check-in"
                : alreadyCheckedIn || ticket.status === "USED"
                ? "ALREADY CHECKED IN"
                : ticket.status}
            </p>
            <div className="mt-6 space-y-1 text-sm text-left">
              <p><strong>Name:</strong> {ticket.registration.fullName}</p>
              <p><strong>Ticket:</strong> {ticket.ticketNumber}</p>
              <p><strong>Type:</strong> {ticket.registration.ticketType.name}</p>
              {alreadyCheckedIn && (
                <p className="text-amber-700">
                  Checked in at: {new Date(ticket.checkIns[0].checkedInAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
