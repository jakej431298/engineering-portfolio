import { ArrowDown, ArrowRight } from "lucide-react";
import { NETWORK_LAYERS, VERILOG_MODULES } from "@/data/fpga-project";

export function FpgaArchitectureSection() {
  return (
    <section id="architecture" className="section-rule scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          02 · Technical Architecture
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          From PyTorch MLP to Verilog RTL
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The identical three-layer handwritten-digit classifier (109,184 total weights) was first
          trained in PyTorch, then mapped onto a sequential fixed-point hardware pipeline targeting
          a Xilinx Artix-7 FPGA.
        </p>

        <div className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-foreground">
              MNIST Neural Network Topology
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              100,352 + 8,192 + 640 = 109,184 MAC operations / inference
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            {NETWORK_LAYERS.map((layer, index) => (
              <div key={layer.name} className="contents">
                <div className="flex flex-col justify-between rounded-lg border border-border bg-background/80 p-4">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-primary">
                      {layer.name}
                    </div>
                    <div className="mt-2 font-mono text-3xl font-semibold tabular-nums text-foreground">
                      {layer.size}
                    </div>
                    <div className="mt-1 font-mono text-xs text-signal">{layer.activation}</div>
                  </div>
                  <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
                    {layer.detail}
                  </p>
                </div>

                {index < NETWORK_LAYERS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center text-muted-foreground"
                  >
                    <ArrowRight className="hidden h-5 w-5 lg:block" />
                    <ArrowDown className="h-5 w-5 lg:hidden" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-border/80 bg-background/60 px-4 py-3 font-mono text-xs text-muted-foreground">
            <span className="text-foreground">Sequential timing estimate:</span> 109,184 MACs × 3
            clock cycles × 10 ns period (100 MHz) ≈{" "}
            <span className="text-signal">3.28 ms (~3.3 ms)</span> per single-image inference.
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Verilog Hardware Building Blocks
          </h3>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Instead of instantiating over 100,000 parallel multipliers, the RTL reuses one signed
            8-bit MAC unit steered by a finite state machine, trading throughput for minimal silicon
            area and deterministic cycle timing.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VERILOG_MODULES.map((mod) => (
              <div
                key={mod.name}
                className="flex flex-col justify-between rounded-lg border border-border bg-surface p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-display text-base font-semibold text-foreground">
                      {mod.name}
                    </h4>
                    <span className="rounded bg-secondary px-2 py-0.5 font-mono text-[11px] text-primary">
                      {mod.file}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mod.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}