'use client'

import Image from 'next/image';
import React, {useEffect} from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import {BsArrowRight, BsInstagram, BsLinkedin, BsStrava, BsTiktok, BsYoutube} from "react-icons/bs"
import { useActiveSectionContext } from '@/context/active-section-context';
import { useSectionInView } from "@/lib/hooks";


export default function Intro() {
  
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section ref={ref} id="home" className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]">
        <div className='flex items-center justify-center'>
          <div className="relative">
           <motion.div
            initial={{ opacity: 0, scale: 0}}
            animate={{ opacity: 1, scale: 1}}
            transition={{
                type: "tween",
                duration: 0.2,
            }}
           >
           <Image src="/pb.jpg"
             alt="Jozef portrait"
             width="192"
             height="192"
             quality="95"
             priority={true}
             className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
             />
           </motion.div>  
             <motion.span className="absolute  bottom-0 right-0 text-4xl"
              initial={{ opacity: 0, scale: 0}}
              animate={{ opacity: 1, scale: 1}}
              transition={{
                type: 'spring',
                stiffness: 125,
                delay: 0.1,
                duration: 0.7,
              }}
             >
             👋🏽
             </motion.span>
          </div>
        </div>

        <motion.h1 className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
         initial={{ opacity: 0, y: 100 }}
         animate={{ opacity: 1, y: 0}}
        >
        <span className="font-bold">Hello, I am Jozef.</span> I am a{" "}
        <span className="font-bold">motion designer, editor, videographer and athlete</span> with{" "}
        <span className="font-bold">multiple years</span> of experience in content creation. I enjoy
        working on <span className="italic">creative projects</span>.
        </motion.h1>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
         initial={{ opacity: 0, y: 100 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{
            delay: 0.1,
         }}
        >
            <Link 
                href="#contact" 
                className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
                onClick={() => {
                  setActiveSection("Contact");
                  setTimeOfLastClick(Date.now());
                }}
                >
                Contact me here 
                <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" /> 
            </Link>

            <a className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack hover:text-gray-950"
              href="https://www.instagram.com/jozefkapicak/" target="_blank">
              <BsInstagram />
            </a>

            <a className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack hover:text-gray-950"
              href="https://www.tiktok.com/@jozefkapicak?lang=de-DE" target="_blank">
              <BsTiktok />
            </a>

            <a className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack hover:text-gray-950"
              href="https://www.youtube.com/@joekapicak" target="_blank">
              <BsYoutube />
            </a>

            <a className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack hover:text-gray-950"
              href="https://www.strava.com/athletes/jozefkapicak" target="_blank">
              <BsStrava />
            </a>

            <a className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack hover:text-gray-950"
              href="https://de.linkedin.com/in/jozef-kapicak-9a1b16226">
              <BsLinkedin />
            </a>

        </motion.div>
    </section>
  );
}
