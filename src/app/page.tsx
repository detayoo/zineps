import { Differentiation } from "@/components/Differentiation";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { Integrations } from "@/components/Integrations";
import { Partners } from "@/components/Partners";
import { ShippingAi } from "@/components/ShippingAi";

export default function Home() {
  return (
    <main>
      <Hero />
      <ShippingAi />
      <Partners />
      <Integrations />
      <Differentiation />
      <Faq />
      <FinalCta />
    </main>
  );
}
