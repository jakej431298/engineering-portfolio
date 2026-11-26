import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { NETWORK_LAYERS } from "@/data/fpga-project";
import { buildPageHead, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the completed FPGA project and both future project template routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const path of [
      "/projects/fpga-vs-gpu",
      "/projects/future-project-2",
      "/projects/future-project-3",
    ]) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).toBe(path);
    }
  });

  it("sums the 3-layer MNIST MLP MAC parameters accurately to 109,184", () => {
    const totalMacs = NETWORK_LAYERS.reduce((sum, layer) => sum + (layer.macs ?? 0), 0);
    expect(totalMacs).toBe(109184);
  });

  it("builds portfolio SEO metadata with the requested title, topics, canonical link, and absolute share image", () => {
    expect(SITE_TITLE).toBe("Jake Julius | Engineering Portfolio");
    expect(SITE_DESCRIPTION).toMatch(/electrical engineering/i);
    expect(SITE_DESCRIPTION).toMatch(/computer engineering/i);
    expect(SITE_DESCRIPTION).toMatch(/AI/);
    expect(SITE_DESCRIPTION).toMatch(/hardware development/i);

    const head = buildPageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      path: "/projects/fpga-vs-gpu",
      type: "article",
      origin: "https://example.edu",
    });

    expect(head.links).toEqual([{ rel: "canonical", href: "/projects/fpga-vs-gpu" }]);
    expect(head.meta).toContainEqual({
      property: "og:image",
      content: "https://example.edu/og-image.jpg",
    });
    expect(head.meta).toContainEqual({
      name: "twitter:image",
      content: "https://example.edu/og-image.jpg",
    });
  });
});
