const FALLBACK_SITE_URL = "https://zineps-rose.vercel.app";

/**
 * Canonical site URL. Set `NEXT_PUBLIC_SITE_URL` in the hosting environment
 * (e.g. Vercel) per deployment; anything else falls back to the live revamp
 * URL so tags never point at localhost or the wrong domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/+$/, "");
