import QRCode from "qrcode";

export async function generateQRDataUrl(token: string, baseUrl: string): Promise<string> {
  const verifyUrl = `${baseUrl}/verify/${token}`;
  return QRCode.toDataURL(verifyUrl, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 280,
    color: {
      dark: "#242424",
      light: "#F5F1E8",
    },
  });
}

export function getVerificationUrl(token: string, baseUrl: string) {
  return `${baseUrl}/verify/${token}`;
}
