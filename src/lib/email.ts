import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendConfirmationEmail({
  to,
  participantName,
  ticketNumber,
  registrationId,
  ticketType,
  qrDataUrl,
}: {
  to: string;
  participantName: string;
  ticketNumber: string;
  registrationId: string;
  ticketType: string;
  qrDataUrl?: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set – email skipped");
    return { success: false, error: "Email service not configured" };
  }

  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const fromName = process.env.RESEND_FROM_NAME || "Frame By Frame 2027";

  const html = `
    <div style="font-family: Georgia, 'Playfair Display', serif; max-width: 600px; margin: 0 auto; background: #F5F1E8; padding: 40px 32px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #242424; font-size: 28px; margin: 0;">Frame By Frame 2027</h1>
        <p style="color: #C6A15B; font-style: italic; margin-top: 8px;">Every Frame Tells a Story. Every Story Creates an Impact.</p>
      </div>
      <h2 style="color: #242424; font-size: 22px;">You're registered!</h2>
      <p style="color: #292929; line-height: 1.6;">Hi ${participantName},</p>
      <p style="color: #292929; line-height: 1.6;">Thank you for registering for <strong>Frame By Frame : Short Film and Documentary Festival</strong>.</p>
      <div style="background: #fff; border: 1px solid #C6A15B; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <p style="margin: 0 0 8px; color: #292929;"><strong>Ticket Number:</strong> ${ticketNumber}</p>
        <p style="margin: 0 0 8px; color: #292929;"><strong>Registration ID:</strong> ${registrationId}</p>
        <p style="margin: 0; color: #292929;"><strong>Ticket Type:</strong> ${ticketType}</p>
      </div>
      <p style="color: #292929; line-height: 1.6;">
        <strong>Dates:</strong> 23–24 January 2027<br/>
        <strong>Time:</strong> 9:00 AM – 6:00 PM IST<br/>
        <strong>Venue:</strong> Suchitra Cinema and Cultural Academy, Bengaluru
      </p>
      ${qrDataUrl ? `<div style="text-align: center; margin: 24px 0;"><img src="${qrDataUrl}" alt="Ticket QR Code" width="200" height="200" style="border: 4px solid #C6A15B; border-radius: 8px;" /><p style="color: #666; font-size: 13px;">Present this QR code at the entrance</p></div>` : ""}
      <p style="color: #292929; line-height: 1.6;">We look forward to seeing you there.</p>
      <hr style="border: none; border-top: 1px solid #E0D9C4; margin: 32px 0;" />
      <p style="color: #666; font-size: 13px; text-align: center;">
        Organized by Prachi Patel<br/>
        Contact: prachiiip06@gmail.com | 9113693553
      </p>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: `${fromName} <${from}>`,
      to: [to],
      subject: `Your Frame By Frame 2027 Ticket – ${ticketNumber}`,
      html,
    });
    return { success: true, id: result.data?.id };
  } catch (error: any) {
    console.error("Resend error:", error);
    return { success: false, error: error.message };
  }
}
