"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useSwipeable } from 'react-swipeable';
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

// Stripe-Setup
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Bilder für das Karussell
const images = ["/cover.jpg", "/cover2.jpg", "/cover3.jpg"];

const EbookSale = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [[page, direction], setPage] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const imageIndex = wrap(0, images.length, page);
  const { ref } = useSectionInView("Ebook");

  // Swipeable-Konfiguration
  const handlers = useSwipeable({
    onSwipedLeft: () => paginate(1),
    onSwipedRight: () => paginate(-1),
    trackMouse: true,
  });

  const handleBuy = async () => {
    if (!selectedLanguage) {
      alert("Please select a language before proceeding.");
      return;
    }

    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

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
      <SectionHeading>Ebook</SectionHeading>

      <div className="flex flex-col items-center mt-12 sm:flex-row">
        <motion.div
          className="relative overflow-hidden w-full max-w-md sm:max-w-sm sm:mr-8 sm:w-[30rem]"
          {...handlers}
        >
          <div className="relative w-full h-[40rem] sm:h-[35rem]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={page}
                src={images[imageIndex]}
                alt="E-Book Cover"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
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

        <motion.div
          className="flex-1 flex flex-col items-center justify-center text-left mt-6 sm:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xl font-bold mb-6">€34.00 EUR</p>

          <p className="mb-6 leading-relaxed text-center">
            The Engine: A Guide to Hyrox, Marathon, and Half-Marathon Training.
            This comprehensive guide offers training plans, strength workouts, endurance tips, and nutrition strategies to help athletes of all levels prepare for Hyrox and long-distance races.
          </p>

          {/* Container für das Dropdown-Menü */}
          <div className="flex flex-col items-center w-full mb-4">
            <label htmlFor="language" className="font-medium mb-2">
              Choose Language:
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="p-3 border rounded-md text-center w-3/4 sm:w-1/2 md:w-3/4 lg:w-3/5 xl:w-2/5"
            >
              <option value="">Select a language</option>
              <option value="de">German</option>
              <option value="en">English</option>
            </select>
          </div>

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





























