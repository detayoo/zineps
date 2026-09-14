import { Differentiation } from "@/components/Differentiation";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Differentiation />
      <Faq />
      <FinalCta />
    </main>
  );
}
