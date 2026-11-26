import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import fpgaBackdrop from "@/assets/fpga-silicon-backdrop.jpg";
import {
  buildPageHead,
  originQueryOptions,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => ({
    origin: await context.queryClient.ensureQueryData(originQueryOptions),
  }),
  head: ({ loaderData }) =>
    buildPageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      path: "/",
      type: "website",
      ...(loaderData?.origin ? { origin: loaderData.origin } : {}),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        mainEntity: {
          "@type": "Person",
          name: "Jake Julius",
          affiliation: {
            "@type": "EducationalOrganization",
            name: "Livingston High School",
          },
          knowsAbout: [
            "Electrical Engineering",
            "Computer Engineering",
            "Artificial Intelligence",
            "Hardware Development",
            "FPGA Design",
            "Verilog RTL",
          ],
        },
      },
    }),
  component: Index,
});

const ENGINEERING_FIELDS = [
  "Electrical Engineering",
  "Computer Engineering",
  "Computer Architecture",
  "Sustainable Computing",
];

const SKILLS = [
  "Digital logic design",
  "Hardware & software integration",
  "Experimental methodology",
  "Data analysis & benchmarking",
  "Environmental systems thinking",
];

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={fpgaBackdrop}
          alt="Close-up of an FPGA circuit board and silicon die with illuminated blue traces"
          className="absolute inset-0 h-full w-full object-cover object-right opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/30"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Jake Julius · Livingston High School · 11th Grade
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Hardware &amp; AI Systems Engineering
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              An independent engineering portfolio investigating custom digital hardware, neural
              network acceleration, and energy-conscious computing architectures.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects/fpga-vs-gpu"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore FPGA vs. GPU Research
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Engineering Projects
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Independent hardware and software investigations built for electrical
            engineering study.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Link
              to="/projects/fpga-vs-gpu"
              className="group flex flex-col justify-between rounded-xl border border-primary/40 bg-surface p-6 transition-colors hover:border-primary lg:col-span-2"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-signal">PROJECT 01 · COMPLETED RESEARCH</span>
                  <span className="text-muted-foreground">12 Weeks · July 2026</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                  FPGAs vs. GPUs in AI Systems
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Trained a 3-layer MNIST neural network (109,184 parameters) in PyTorch, designed
                  an equivalent Verilog RTL hardware pipeline targeting Xilinx Artix-7, and compared
                  latency, power draw, energy per inference, accuracy, and CO₂ impact against a
                  measured NVIDIA T4 GPU.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                  {["PyTorch", "Python", "Verilog RTL", "NVIDIA T4", "Artix-7"].map((tech) => (
                    <span key={tech} className="rounded bg-secondary px-2.5 py-1 text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-primary">
                <span>Read full research report &amp; benchmarks</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>

            <div className="flex flex-col gap-6">
              <Link
                to="/projects/future-project-2"
                className="group flex flex-1 flex-col justify-between rounded-xl border border-dashed border-border bg-surface/60 p-6 transition-colors hover:border-primary/60"
              >
                <div>
                  <div className="font-mono text-xs text-muted-foreground">
                    PROJECT 02 · TEMPLATE
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    Future Project 2
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Reserved template page for an upcoming engineering project.
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-primary">
                  <span>Open template</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </Link>

              <Link
                to="/projects/future-project-3"
                className="group flex flex-1 flex-col justify-between rounded-xl border border-dashed border-border bg-surface/60 p-6 transition-colors hover:border-primary/60"
              >
                <div>
                  <div className="font-mono text-xs text-muted-foreground">
                    PROJECT 03 · TEMPLATE
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    Future Project 3
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Reserved template page for an upcoming engineering project.
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-primary">
                  <span>Open template</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-rule bg-surface/50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Academic Focus</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              My independent work explores how hardware architecture decisions shape real-world
              power draw, latency determinism, and environmental sustainability in modern computing
              systems.
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ENGINEERING_FIELDS.map((field) => (
                <li
                  key={field}
                  className="rounded-md border border-border bg-background/70 px-3.5 py-2.5 font-mono text-xs text-foreground"
                >
                  {field}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Demonstrated Engineering Skills
            </h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center justify-between py-3 text-sm text-foreground"
                >
                  <span>{skill}</span>
                  <span className="font-mono text-xs text-primary">✓</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
