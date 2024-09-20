import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import path from 'path';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');

  try {
    // Puffer des Request-Objekts
    const buf = await req.arrayBuffer();
    const buffer = Buffer.from(buf); // Konvertiere Uint8Array in Buffer
    const event = stripe.webhooks.constructEvent(buffer, sig!, webhookSecret);

    // Verarbeite das Ereignis `checkout.session.completed`
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extrahiere Kunden-E-Mail
      const customerEmail = session.customer_details?.email ?? undefined;

      // Extrahiere Price-ID, um zu identifizieren, welches E-Book gekauft wurde
      const priceId = session.metadata?.priceId;

      // Sende das entsprechende E-Book an die E-Mail-Adresse
      if (typeof customerEmail === 'string') {
        console.log(`Sende E-Book an: ${customerEmail}, Price-ID: ${priceId}`);
        await sendEbookByEmail(customerEmail, priceId);
      } else {
        console.error('Ungültige E-Mail-Adresse:', customerEmail);
      }

      return NextResponse.json({ received: true });
    }
  } catch (err) {
    console.error('Webhook-Fehler:', err instanceof Error ? err.message : 'Unbekannter Fehler');
    return NextResponse.json(
      { error: `Webhook-Fehler: ${err instanceof Error ? err.message : 'Unbekannter Fehler'}` },
      { status: 400 }
    );
  }
  return NextResponse.json({ error: 'Unbekannte Anfrage' }, { status: 405 });
}

// Funktion zum Versenden der E-Mail mit der entsprechenden PDF
async function sendEbookByEmail(email: string, priceId: string | undefined) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Bestimme das E-Book basierend auf der Price-ID
  let filePath;
  let subject;
  let text;

  if (priceId === process.env.PRICE_ID_SUB4) {
    filePath = path.join(process.cwd(), 'public', 'Sub4-Marathon.pdf');
    subject = 'Sub 4 Hour Marathon Plan';
    text = 'Thank you for your purchase of the Sub 4 Hour Marathon Plan! Here is your e-book.';
  } else if (priceId === process.env.PRICE_ID_SUB330) {
    filePath = path.join(process.cwd(), 'public', 'Sub3-30-Marathon.pdf');
    subject = 'Sub 3:30 Marathon Plan';
    text = 'Thank you for your purchase of the Sub 3:30 Marathon Plan! Here is your e-book.';
  } else if (priceId === process.env.PRICE_ID_SUB3) {
    filePath = path.join(process.cwd(), 'public', 'Sub3-Marathon.pdf');
    subject = 'Sub 3 Hour Marathon Plan';
    text = 'Thank you for your purchase of the Sub 3 Hour Marathon Plan! Here is your e-book.';
  } else {
    console.error('Ungültige Price-ID:', priceId);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
    attachments: [
      {
        filename: path.basename(filePath),
        path: filePath,
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    console.log(`Versuche, eine E-Mail an ${email} mit der Datei ${filePath} zu senden...`);
    const info = await transporter.sendMail(mailOptions);
    console.log('E-Mail erfolgreich gesendet:', info);
  } catch (error) {
    console.error(`Fehler beim Senden der E-Mail an ${email}:`, error);
  }
}












