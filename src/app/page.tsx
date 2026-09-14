import { Automate } from "@/components/Automate";
import { Differentiation } from "@/components/Differentiation";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { Integrations } from "@/components/Integrations";
import { Partners } from "@/components/Partners";
import { PartnerRates } from "@/components/PartnerRates";
import { ShippingAi } from "@/components/ShippingAi";
import { WhyZineps } from "@/components/WhyZineps";

export default function Home() {
  return (
    <main>
      <Hero />
      <PartnerRates />
      <Automate />
      <WhyZineps />
      <ShippingAi />
      <Partners />
      <Integrations />
      <Differentiation />
      <Faq />
      <FinalCta />
    </main>
  );
}
