/**
 * Notification extension point.
 *
 * This project ships without a hard dependency on any particular email
 * provider so it stays easy to deploy. To enable real email notifications:
 *
 *   1. `npm install nodemailer`
 *   2. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO_EMAIL in your
 *      environment variables (see .env.example).
 *   3. Uncomment the nodemailer implementation below.
 *
 * Never call this with secrets hard-coded — always read from process.env,
 * and never import this file into a "use client" component.
 */

type BookingNotificationPayload = {
  referenceId: string;
  fullName: string;
  mobileNumber: string;
  travelDate: string;
  pickupLocation: string;
  serviceRequired: string;
};

export async function notifyNewBooking(payload: BookingNotificationPayload): Promise<void> {
  if (!process.env.SMTP_HOST) {
    // Notifications not configured — this is expected out of the box.
    return;
  }

  try {
    // Example nodemailer implementation (install nodemailer to enable):
    //
    // const nodemailer = await import("nodemailer");
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT || 587),
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // });
    // await transporter.sendMail({
    //   from: process.env.SMTP_USER,
    //   to: process.env.NOTIFY_TO_EMAIL,
    //   subject: `New booking ${payload.referenceId} — ${payload.fullName}`,
    //   text: `New booking received.\n\nReference: ${payload.referenceId}\nName: ${payload.fullName}\nMobile: ${payload.mobileNumber}\nTravel date: ${payload.travelDate}\nPickup: ${payload.pickupLocation}\nService: ${payload.serviceRequired}`,
    // });
    console.log(`[notifications] Would send booking notification for ${payload.referenceId} once SMTP is wired up.`);
  } catch (error) {
    console.error("Failed to send booking notification email:", error);
  }
}
