import { createFileRoute } from "@tanstack/react-router";
import { FutureProjectTemplate } from "@/components/FutureProjectTemplate";
import { buildPageHead, originQueryOptions } from "@/lib/seo";

export const Route = createFileRoute("/projects/future-project-3")({
  loader: async ({ context }) => ({
    origin: await context.queryClient.ensureQueryData(originQueryOptions),
  }),
  head: ({ loaderData }) =>
    buildPageHead({
      title: "Future Project 3 | Jake Julius",
      description:
        "Reserved page for Project 03 in Jake Julius's engineering portfolio, covering electrical engineering, computer engineering, AI, and hardware development.",
      path: "/projects/future-project-3",
      type: "website",
      ...(loaderData?.origin ? { origin: loaderData.origin } : {}),
    }),
  component: FutureProject3Page,
});

function FutureProject3Page() {
  return <FutureProjectTemplate projectNumber={3} />;
}