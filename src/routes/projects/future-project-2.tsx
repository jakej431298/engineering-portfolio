import { createFileRoute } from "@tanstack/react-router";
import { FutureProjectTemplate } from "@/components/FutureProjectTemplate";
import { buildPageHead, originQueryOptions } from "@/lib/seo";

export const Route = createFileRoute("/projects/future-project-2")({
  loader: async ({ context }) => ({
    origin: await context.queryClient.ensureQueryData(originQueryOptions),
  }),
  head: ({ loaderData }) =>
    buildPageHead({
      title: "Future Project 2 | Jake Julius",
      description:
        "Reserved page for Project 02 in Jake Julius's engineering portfolio, covering electrical engineering, computer engineering, AI, and hardware development.",
      path: "/projects/future-project-2",
      type: "website",
      ...(loaderData?.origin ? { origin: loaderData.origin } : {}),
    }),
  component: FutureProject2Page,
});

function FutureProject2Page() {
  return <FutureProjectTemplate projectNumber={2} />;
}