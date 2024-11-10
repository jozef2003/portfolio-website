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
        When i started my bachelors degree in{" "}
        <span className="font-medium">economics at LMU</span>, I discovered my passion for endurance 
        sports, especially triathlon and later hybrid training such as Hyrox. I
        started documenting my exercise journey online, specifically to inspire people
        to live a healthier lifestyle. {" "}
        <span className="font-medium"> This brought me into contact
        with the topic of content creation and editing. I have since developed further in this area and aquired new skills such as coding.</span>{" "}
        <span className="italic">What fascinates me about video/ photography
        and editing</span> is that you can always be creative when working on great projects.
      </p>
    </motion.section>
  );
}