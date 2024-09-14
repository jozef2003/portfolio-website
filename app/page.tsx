import Intro from "@/components/intro"
import SectionDivider from "@/components/section-divider"
import About from "@/components/about"
import Contact from "@/components/contact"
import EbookSale from '../components/ebook-sale';

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro/>
      <SectionDivider />
      <About />
      <EbookSale />
      <Contact />
    </main>
  )
}
