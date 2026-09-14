import { Differentiation } from "@/components/Differentiation";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { Integrations } from "@/components/Integrations";

export default function Home() {
  return (
    <main>
      <Hero />
      <Integrations />
      <Differentiation />
      <Faq />
      <FinalCta />
    </main>
  );
}
