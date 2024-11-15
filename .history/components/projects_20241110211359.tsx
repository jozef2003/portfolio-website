"use client";

import React from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects");  

  return (
    <section ref={ref} id="projects" className=" mb-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
          <React.Fragment>
            <Project/>
          </React.Fragment>
      </div>
    </section>
  );
}