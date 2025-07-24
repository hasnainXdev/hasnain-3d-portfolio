import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

export async function sendMessageViaGmail({ name, email, message }: any) {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const rawMessage = [
    `From: "Portfolio Contact" <${process.env.GMAIL_USER}>`,
    `To: ${process.env.GMAIL_USER}`,
    `Subject: New Message from Portfolio`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Message: ${message}`,
  ].join('\n');

  const encodedMessage = Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });
    console.log("✅ Email sent successfully!");
  } catch (err: any) {
    console.error("❌ Failed to send email:", err.response?.data || err.message);
  }
}
