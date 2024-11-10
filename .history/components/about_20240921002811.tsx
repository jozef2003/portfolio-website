"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");
  
  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
  When I started my bachelors degree in{" "}
  <span className="font-medium">economics at LMU</span>, I discovered my passion for endurance 
  sports, especially triathlon and later hybrid training such as Hyrox. My dedication to training led me to run a marathon in 3 hours, and I later qualified for the <span className="font-medium">Hyrox World Championship in Nice, France</span>, where I proudly competed against some of the worlds best athletes.
</p>

<p className="mb-3">
  Throughout my journey, I have learned that fitness is more than just physical training, its about pushing your limits, both mentally and physically. My goal is to inspire others to take control of their fitness, challenge themselves, and reach new levels of performance.
</p>


    </motion.section>
  );
}