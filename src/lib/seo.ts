import { queryOptions } from "@tanstack/react-query";
import { getRequestOrigin } from "./origin.functions";

export const SITE_TITLE = "Jake Julius | Engineering Portfolio";
export const SITE_DESCRIPTION =
  "Independent engineering research and projects by Jake Julius, showcasing work in electrical engineering, computer engineering, AI, and hardware development.";
export const OG_IMAGE_PATH = "/og-image.jpg";
export const OG_IMAGE_ALT =
  "Jake Julius | Engineering Portfolio: Electrical Engineering, Computer Engineering, AI, and Hardware";

export const originQueryOptions = queryOptions({
  queryKey: ["request-origin"] as const,
  queryFn: () => getRequestOrigin(),
  staleTime: Infinity,
});

export interface PageHeadInput {
  title: string;
  description: string;
  path: string;
  type: "website" | "article";
  origin?: string;
  jsonLd?: Record<string, unknown>;
}

export function buildPageHead({
  title,
  description,
  path,
  type,
  origin,
  jsonLd,
}: PageHeadInput) {
  const ogImageUrl = origin ? `${origin}${OG_IMAGE_PATH}` : null;

  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    ...(ogImageUrl
      ? [
          { property: "og:image", content: ogImageUrl },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { property: "og:image:alt", content: OG_IMAGE_ALT },
          { name: "twitter:image", content: ogImageUrl },
          { name: "twitter:image:alt", content: OG_IMAGE_ALT },
        ]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  const links = [{ rel: "canonical", href: path }];

  if (jsonLd) {
    return {
      meta,
      links,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  }

  return { meta, links };
}