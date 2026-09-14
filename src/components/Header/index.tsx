import { HeaderVariantOne } from "./variants/HeaderVariantOne";

/**
 * Header resolver. The `variant` union is always the full set — missing
 * variants fall back to `one`, so the header never breaks.
 */
const variants: Record<string, () => React.JSX.Element> = {
  one: HeaderVariantOne,
};

export type HeaderVariant = "one" | "two" | "three" | "four";

interface Props {
  variant?: HeaderVariant;
}

export function Header({ variant = "one" }: Props) {
  const Variant = variants[variant] ?? variants.one;
  return <Variant />;
}
