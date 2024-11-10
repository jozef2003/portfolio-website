import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaCamera, FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Bachelor economics",
    location: "Munich, GER",
    description:
      "I started my bachelors degree in economics at the LMU. ",
    icon: React.createElement(LuGraduationCap),
    date: "2021 - present",
  },
  {
    title: "Content creator",
    location: "Remote",
    description:
      "In 2021, i discovered my passion for content creation. I started building a personal brand on my social media channels and now help companies to write, film and edit content to grow their audience.",
    icon: React.createElement(FaCamera),
    date: "2021 - present",
  },
] as const;

export const skillsData = [
  "Premiere pro",
  "After effects",
  "Illustrator",
  "Photoshop",
  "Videography",
  "Sound design",
  "Photography",
  "Copywriting",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Python",
  "React",
  "Expo",
  "Firebase",
] as const;