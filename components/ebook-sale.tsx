"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

// Stripe-Setup
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Bilder für das Karussell
const images = ["/cover.jpg", "/cover2.jpg", "/cover3.jpg"];

const EbookSale = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(""); // Standardwert: leer, um eine Auswahl zu erzwingen
  const [[page, direction], setPage] = useState([0, 0]); // Für das Karussell
  const [isLoading, setIsLoading] = useState(false); // Für Ladezustand
  const imageIndex = wrap(0, images.length, page); // Zyklisches Karussell
  const { ref } = useSectionInView("Ebook");

  const handleBuy = async () => {
    if (!selectedLanguage) {
      alert("Please select a language before proceeding.");
      return;
    }

    setIsLoading(true); // Ladezustand aktivieren

    try {
      const stripe = await stripePromise;

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ language: selectedLanguage }),
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
      setIsLoading(false); // Ladezustand deaktivieren
    }
  };

  // Funktion für das Karussell (Nächste/Vorherige Seite)
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <motion.section
      ref={ref}
      className="pt-4 mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="ebook"
    >
      {/* Section Heading */}
      <SectionHeading>Ebook</SectionHeading>

      {/* Flex Container for Image and Details */}
      <div className="flex justify-center items-center mx-auto max-w-6xl mt-12 flex-col sm:flex-row">
        {/* Left: E-Book Image (Karussell) */}
        <motion.div className="flex-1 max-w-sm mr-8 relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={images[imageIndex]}
              alt="E-Book Cover"
              className="w-full h-[30rem] object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          {/* Previous and Next Buttons */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button
              aria-label="Previous Image"
              className="p-2 text-black hover:text-white transition-colors duration-300"
              onClick={() => paginate(-1)}
            >
              &lt;
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button
              aria-label="Next Image"
              className="p-2 text-black hover:text-white transition-colors duration-300"
              onClick={() => paginate(1)}
            >
              &gt;
            </button>
          </div>
        </motion.div>

        {/* Right: Details and Purchase Options */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Preis zuerst */}
          <p className="text-3xl font-bold mb-6">€34.00 EUR</p>

          {/* Beschreibung */}
          <p className="mb-6 leading-relaxed text-center">
            The Engine: A Guide to Hyrox, Marathon, and Half-Marathon Training.
            This comprehensive guide offers training plans, strength workouts, endurance tips, and nutrition strategies to help athletes of all levels prepare for Hyrox and long-distance races.
          </p>

          {/* Language Selector */}
          <div className="mb-4">
            <label htmlFor="language" className="font-medium">
              Choose Language:
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="ml-2 p-2 border rounded-md"
            >
              <option value="">Select a language</option> {/* Leere Option */}
              <option value="de">German</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Buy Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white py-2 px-5 rounded-md shadow-md hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBuy}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Get the Book"}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EbookSale;














