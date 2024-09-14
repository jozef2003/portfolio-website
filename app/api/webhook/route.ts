import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import nodemailer from 'nodemailer';
import path from 'path';

// Stripe und Webhook-Signing-Secret initialisieren
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Deaktiviere das automatische Body-Parsing von Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];

    try {
      // Stripe erwartet das Request-Body als Buffer (rohe Daten)
      const buf = await buffer(req);

      // Webhook validieren mit der Signatur
      const event = stripe.webhooks.constructEvent(buf, sig!, webhookSecret);

      // Verarbeite das Ereignis `checkout.session.completed`
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Kunden-E-Mail extrahieren
        const customerEmail = session.customer_details?.email ?? undefined;

        // Überprüfe, ob Metadaten vorhanden sind und setze Standard auf "de"
        const language = session.metadata?.language || "de";

        if (typeof customerEmail === 'string') {
          console.log(`Sende E-Book an: ${customerEmail} in Sprache: ${language}`);
          await sendEbookByEmail(customerEmail, language);
        } else {
          console.error('Ungültige E-Mail-Adresse:', customerEmail);
        }

        res.status(200).json({ received: true });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Webhook-Fehler:', err.message);
        res.status(400).send(`Webhook-Fehler: ${err.message}`);
      } else {
        res.status(400).send('Unbekannter Webhook-Fehler');
      }
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

// Funktion zum Versenden der E-Mail mit der entsprechenden PDF
async function sendEbookByEmail(email: string, language: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Pfad zur PDF-Datei basierend auf der Sprache
  let filePath = path.join(process.cwd(), 'public', 'The-Engine.pdf'); // Standard Deutsch
  if (language === 'en') {
    filePath = path.join(process.cwd(), 'public', 'The-Engine_English.pdf'); // Englisch
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: language === 'en' ? 'Your Fitness E-Book' : 'Dein Fitness E-Book',
    text: language === 'en'
      ? 'Thank you for your purchase! Here is your e-book.'
      : 'Vielen Dank für deinen Kauf! Hier ist dein E-Book.',
    attachments: [
      {
        filename: language === 'en' ? 'The-Engine_English.pdf' : 'The-Engine.pdf',
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


