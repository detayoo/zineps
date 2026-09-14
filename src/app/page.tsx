import { Differentiation } from "@/components/Differentiation";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { Integrations } from "@/components/Integrations";
import { Partners } from "@/components/Partners";

export default function Home() {
  return (
    <main>
      <Hero />
      <Partners />
      <Integrations />
      <Differentiation />
      <Faq />
      <FinalCta />
    </main>
  );
}
