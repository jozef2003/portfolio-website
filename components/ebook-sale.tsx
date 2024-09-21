"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";  // Importiere Image von next/image

// Stripe-Setup
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Bücher-Daten
const books = [
  {
    title: "Sub 4 Hour Marathon Plan",
    price: "€19.00 EUR",
    description:
      "The Sub-4-Hour Marathon Plan guides you to finish in under 4 hours with structured long runs, tempo sessions, and interval training. Improve endurance, speed, and mental strength over 12 weeks. Perfect for runners looking to break the 4-hour barrier!",
    image: "/01img.jpg",
    priceId: process.env.NEXT_PUBLIC_PRICE_ID_SUB4,
  },
  {
    title: "Sub 3:30 Marathon Plan",
    price: "€19.00 EUR",
    description:
      "The Sub-3:30 Marathon Plan is designed for experienced runners aiming to break 3 hours 30 minutes. It combines endurance, speed, and strength training over 12 weeks to maintain a 4:58 min/km pace, helping you achieve your marathon goals efficiently.",
    image: "/02img.jpg",
    priceId: process.env.NEXT_PUBLIC_PRICE_ID_SUB330,
  },
  {
    title: "Sub 3 Hour Marathon Plan",
    price: "€19.00 EUR",
    description:
      "The Sub-3 Marathon Plan is for experienced runners aiming to break 3 hours. Over 12 weeks, it combines endurance, speed, and strength training to maintain a 4:16 min/km pace, helping you reach peak performance and achieve your marathon goal.",
    image: "/03img.JPG",
    priceId: process.env.NEXT_PUBLIC_PRICE_ID_SUB3,
  },
];

const EbookSale = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { ref } = useSectionInView("Training Plans");

  const handleBuy = async (priceId: string) => {
    setIsLoading(true);

    try {
      const stripe = await stripePromise;

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ priceId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { id } = await res.json();

      if (stripe && id) {
        await stripe.redirectToCheckout({ sessionId: id });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      ref={ref}
      className="pt-4 mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="plans"
    >
      <SectionHeading>Training Plans</SectionHeading>

      <div className="flex flex-col items-center mt-12">
        {books.map((book, index) => (
          <motion.div
            key={index}
            className="flex flex-col sm:flex-row items-center mb-12 w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            {/* Unterschiedliches Verhalten für mobile und Desktop-Ansichten */}
            <motion.div
              className="relative w-full sm:w-1/3 h-64 sm:h-auto mb-6 sm:mb-0 sm:mr-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Verwende das Next.js <Image /> Tag */}
              <div className="block sm:hidden"> {/* Für mobile Geräte */}
                <Image
                  src={book.image}
                  alt={`${book.title} Cover`}
                  layout="fill"  // Füllt den Container
                  objectFit="cover"  // Skaliert das Bild, um den Container zu füllen
                  objectPosition="top 15%"  // Zeigt das Bild etwas weiter oben an
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div className="hidden sm:block"> {/* Für Desktop-Geräte */}
                <Image
                  src={book.image}
                  alt={`${book.title} Cover`}
                  layout="responsive"  // Responsives Layout für Desktop
                  width={640}
                  height={480}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>

            {/* Text and Button container */}
            <div className="flex-1 text-center sm:text-left flex flex-col items-center sm:items-start">
              {/* Überschriftengröße verringert (text-xl) */}
              <h3 className="text-xl mb-2">{book.title}</h3>
              {/* Preisgröße verringert (text-lg) */}
              <p className="text-lg mb-3">{book.price}</p>
              {/* Text mit mb-4 */}
              <p className="mb-4">{book.description}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-purple-600 text-white px-5 py-2 flex items-center justify-center sm:justify-start gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-purple-700 active:scale-105 transition"
                onClick={() => handleBuy(book.priceId!)}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Buy Now"}
                <motion.span className="opacity-70 group-hover:translate-x-1 transition">
                  →
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EbookSale;








