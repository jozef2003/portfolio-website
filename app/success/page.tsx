"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <motion.div
      className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-purple-200 via-white to-white text-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Purchase Successful!</h1>
      <p className="text-lg mb-4">
        Your purchase was successful. The e-book will be sent to your email address shortly.
      </p>
      <Link href="/" passHref>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-purple-700 transition-all"
        >
          Go Back to Homepage
        </motion.button>
      </Link>
    </motion.div>
  );
};

// Layout für diese Seite deaktivieren
SuccessPage.layout = false;

export default SuccessPage;






