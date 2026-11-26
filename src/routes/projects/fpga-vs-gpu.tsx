import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { FpgaArchitectureSection } from "@/components/FpgaArchitectureSection";
import { FpgaResultsCharts } from "@/components/FpgaResultsCharts";
import { FpgaWeeklyLog } from "@/components/FpgaWeeklyLog";
import { LIMITATIONS, PROJECT_STATS, REFLECTIONS, SOURCES } from "@/data/fpga-project";
import { buildPageHead, originQueryOptions } from "@/lib/seo";

const PAGE_TITLE = "FPGAs vs. GPUs in AI Systems | Jake Julius";
const PAGE_DESCRIPTION =
  "Independent hardware research comparing an NVIDIA T4 GPU and a custom Verilog Xilinx Artix-7 FPGA pipeline on MNIST neural network inference latency, power, and energy.";

export const Route = createFileRoute("/projects/fpga-vs-gpu")({
  loader: async ({ context }) => ({
    origin: await context.queryClient.ensureQueryData(originQueryOptions),
  }),
  head: ({ loaderData }) =>
    buildPageHead({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      path: "/projects/fpga-vs-gpu",
      type: "article",
      ...(loaderData?.origin ? { origin: loaderData.origin } : {}),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "FPGAs vs. GPUs in AI Systems",
        description: PAGE_DESCRIPTION,
        author: {
          "@type": "Person",
          name: "Jake Julius",
        },
        about: [
          "FPGA",
          "GPU",
          "Neural Network Inference",
          "Verilog RTL",
          "Hardware Acceleration",
        ],
      },
    }),
  component: FpgaVsGpuPage,
});

const SECTION_LINKS = [
  { href: "#overview", label: "01 Overview" },
  { href: "#architecture", label: "02 Architecture" },
  { href: "#methodology", label: "03 Methodology" },
  { href: "#results", label: "04 Results" },
  { href: "#timeline", label: "05 Weekly Log" },
  { href: "#reflection", label: "06 Reflection" },
  { href: "#sources", label: "07 Sources" },
];

function FpgaVsGpuPage() {
  return (
    <div>
      <section id="overview" className="lab-grid scroll-mt-20 border-b border-border py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Portfolio Overview
          </Link>

          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-primary">
            Independent Engineering Research · July 2026
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            FPGAs vs. GPUs in AI Systems
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Efficiency, Customizability, and Environmental Impact of Neural Network Inference
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            <span>Researcher: Jake Julius</span>
            <span>Livingston High School · 11th Grade</span>
            <span>PyTorch · Python · Verilog · NVIDIA T4 · Xilinx Artix-7</span>
          </div>

          <nav
            aria-label="Jump to project section"
            className="mt-8 flex flex-wrap gap-2 border-y border-border py-3"
          >
            {SECTION_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECT_STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-surface/90 p-5">
                <div className="font-mono text-3xl font-bold tabular-nums text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">{stat.label}</div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">{stat.detail}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-6 lg:col-span-2">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Project Abstract
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                I investigated the computational tradeoffs between GPUs and FPGAs for artificial
                intelligence inference, focusing on latency, active power draw, energy per task,
                classification accuracy, and estimated environmental impact. I built and trained a
                three-layer neural network in PyTorch on the MNIST handwritten-digit dataset, then
                designed a corresponding fixed-point Verilog RTL architecture targeting a Xilinx
                Artix-7 FPGA. Comparing measured NVIDIA T4 benchmarks against simulated Artix-7
                behavior clarifies where custom hardware excels, and where sequential architectures
                fall short.
              </p>
            </div>

            <div className="space-y-4 rounded-xl border border-border bg-surface p-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary">
                  Research Question
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  Can a custom FPGA architecture run AI inference with greater energy efficiency and
                  lower carbon impact than a GPU while preserving acceptable accuracy?
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-signal">
                  Core Hypothesis
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  A task-specific FPGA will outperform an NVIDIA T4 GPU in energy efficiency at
                  comparable accuracy, a hypothesis partially supported on power draw, yet challenged
                  on energy per inference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FpgaArchitectureSection />

      <section id="methodology" className="section-rule scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            03 · Experimental Methodology
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Measured Cloud GPU vs. Simulated FPGA RTL
          </h2>
          <p className="mt-3 max-w-3xl text-base text-muted-foreground">
            For experimental transparency, the NVIDIA T4 metrics were directly measured on Google
            Colab, whereas the Xilinx Artix-7 Verilog implementation was functionally simulated in
            EDA Playground with power estimated via Xilinx Power Estimator rather than measured on a
            physical board.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  GPU Implementation
                </h3>
                <span className="rounded bg-primary/15 px-2.5 py-0.5 font-mono text-xs text-primary">
                  Measured · Colab T4
                </span>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>• 3-layer PyTorch MLP trained for 5 epochs on 60,000 MNIST images.</li>
                <li>• Evaluated in both Float32 (97.26%) and simulated 8-bit integer (97.22%).</li>
                <li>• Benchmarked average latency, median latency, and jitter at batch=1 &amp; 64.</li>
                <li>• Logged live power (W), temperature (°C), and utilization via nvidia-smi every 100 ms.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  FPGA Implementation
                </h3>
                <span className="rounded bg-signal/15 px-2.5 py-0.5 font-mono text-xs text-signal">
                  Simulated · Artix-7 RTL
                </span>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>• Custom Verilog RTL modules: MAC unit, ReLU, FSM-driven FC layer, and argmax.</li>
                <li>• Trained 8-bit integer weights exported from Python to hexadecimal .mem files.</li>
                <li>• Verified behavior in EDA Playground simulation (94.22% custom quantization).</li>
                <li>• Power (~3.5 W) estimated via Xilinx Power Estimator; latency modeled at 100 MHz.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FpgaResultsCharts />
      <FpgaWeeklyLog />

      <section id="reflection" className="section-rule scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            06 · Reflection &amp; Next Steps
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Engineering Takeaways &amp; Limitations
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {REFLECTIONS.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-surface p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface/80 p-6">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Current Limitations &amp; Planned Improvements
            </h3>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
              {LIMITATIONS.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span className="font-mono text-primary">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="sources" className="section-rule scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            07 · References
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Technical Sources &amp; Documentation
          </h2>

          <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
            {SOURCES.map((src) => (
              <div
                key={src.title}
                className="grid gap-2 px-5 py-4 md:grid-cols-[2fr_1fr_2.5fr] md:items-baseline"
              >
                <div className="font-medium text-foreground">{src.title}</div>
                <div className="font-mono text-xs text-primary">{src.org}</div>
                <div className="text-sm text-muted-foreground">{src.usage}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}