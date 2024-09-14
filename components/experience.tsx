/*"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  
  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="experience"
    >
      <SectionHeading>My Experience</SectionHeading>
      <p className="mb-3">
         In 2021, i discovered my passion for content creation. I started building a personal brand on my social media channels and now help companies to write, film and edit content to grow their audience.
      </p>
    </motion.section>
  );
} */