import Link from "next/link";

const secondaryCta =
  "rounded-pill border border-border px-6 py-3 text-[15px] font-medium text-foreground transition-colors duration-200 hover:bg-muted";
const primaryCta =
  "rounded-pill bg-accent px-6 py-3 text-[15px] font-semibold text-accent-ink transition-all duration-200 hover:bg-accent/90 active:scale-[0.98]";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1200px] px-6">
      {/* Hero — the header's floating capsule sits over this. */}
      <section className="flex flex-col items-center pb-24 pt-[168px] text-center sm:pt-[132px]">
        <span className="mb-6 inline-flex items-center gap-2 rounded-pill border border-border bg-accent-soft px-4 py-1.5 text-[13px] font-medium text-accent-strong">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
          The intelligent layer for logistics
        </span>

        <h1 className="max-w-[900px] text-balance text-[44px] font-semibold leading-[1.08] tracking-[-0.02em] md:text-[36px] sm:text-[30px]">
          For companies that ship, and the logistics partners that move their
          goods
        </h1>

        <p className="mt-6 max-w-[620px] text-[17px] leading-relaxed text-muted-foreground">
          One infrastructure with a dashboard and an API. Use sharp shipping
          rates from our network of logistics service providers, your own
          shipping contracts, or both.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="https://app.zineps.com/Account/Register"
            className={primaryCta}
          >
            Start shipping
          </Link>
          <Link href="/logistics-operating-system" className={secondaryCta}>
            I&apos;m a logistics partner
          </Link>
        </div>

        <div className="mt-16 w-full rounded-[28px] border border-border bg-muted/60 p-3">
          <div className="flex h-[320px] items-center justify-center rounded-[20px] border border-border bg-background text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
            Zineps dashboard
          </div>
        </div>
      </section>

      {/* Scroll stage — proves the capsule's scrolled state. */}
      <section className="grid grid-cols-3 gap-4 pb-32 lg:grid-cols-2 md:grid-cols-1">
        {[
          "Partner shipping rates",
          "Automate your shipping process",
          "Shipping AI",
        ].map((title) => (
          <div
            key={title}
            className="rounded-3xl border border-border bg-muted/40 p-8"
          >
            <h2 className="text-[20px] font-medium">{title}</h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Scroll to see the header&apos;s compact, sharp state.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
