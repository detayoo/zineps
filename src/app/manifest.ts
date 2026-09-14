import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zineps — The intelligent layer for logistics",
    short_name: "Zineps",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B1210",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
