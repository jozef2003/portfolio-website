import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripe-Initialisierung mit dem geheimen Schlüssel aus der Umgebungsvariablen
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  try {
    // Hole die gewählte Sprache aus der Anfrage
    const { language } = await request.json();

    console.log("Ausgewählte Sprache:", language); // Logge die ausgewählte Sprache

    // Wähle die Price-ID basierend auf der Sprache
    const priceId = language === 'de' ? process.env.PRICE_ID_DE : process.env.PRICE_ID_EN;

    console.log("Verwendete Price-ID:", priceId); // Logge die verwendete Price-ID

    if (!priceId) {
      console.error("Price ID nicht gefunden");
      return NextResponse.json({ error: 'Price ID nicht gefunden' }, { status: 400 });
    }

    // Stelle sicher, dass die DOMAIN-Umgebungsvariable korrekt gesetzt ist
    const domain = process.env.DOMAIN;
    if (!domain) {
      console.error("DOMAIN Umgebungsvariable nicht gesetzt");
      return NextResponse.json({ error: 'DOMAIN Umgebungsvariable nicht gesetzt' }, { status: 400 });
    }

    // API für Checkout-Session-Erstellung
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items: [
        {
          price: priceId, // Verwendete Stripe Price ID basierend auf der Sprache
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`, // Volle URL für Erfolg
      cancel_url: `${domain}/cancel`, // Volle URL für Abbruch
    });

    console.log("Erstellte Checkout-Session:", session); // Logge die erstellte Session

    // Rückgabe der Checkout-Session-ID
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error('Fehler bei der Erstellung der Checkout-Session:', err);
    return NextResponse.json({ error: 'Fehler bei der Erstellung der Checkout-Session' }, { status: 500 });
  }
}





