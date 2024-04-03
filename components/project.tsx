'use client'

import { useRef } from 'react';
import SectionHeading from './section-heading'
import Video from 'next-video';
import video01 from '/videos/video01.mp4';
import { motion, useScroll, useTransform } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";


export default function Project() {
  
  const { ref } = useSectionInView("Projects");
  

  return (
    <motion.div
    ref={ref}
    /*style={{
      scale: scaleProgess,
      opacity: opacityProgess,
    }}*/
    className="group scroll-mt-28 mb-3 sm:mb-8 last:mb-0"
    id='projects'
  >
    <section className="">
        <SectionHeading>My projects</SectionHeading>
        <div>
          <Video src={video01} width={460} height={259}/>
        </div>
    </section>
    </motion.div>
  )
}
