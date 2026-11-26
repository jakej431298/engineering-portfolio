import { useState } from "react";
import { WEEKLY_LOG, type WeeklyLogEntry } from "@/data/fpga-project";

type PhaseFilter = "all" | WeeklyLogEntry["phase"];

const PHASE_TABS: { id: PhaseFilter; label: string; weeks: string }[] = [
  { id: "all", label: "All Weeks", weeks: "1-11" },
  { id: "software", label: "Software & Training", weeks: "Wks 1-4" },
  { id: "hardware", label: "GPU & FPGA RTL", weeks: "Wks 5-9" },
  { id: "verification", label: "Export & Analysis", weeks: "Wks 10-11" },
];

export function FpgaWeeklyLog() {
  const [phase, setPhase] = useState<PhaseFilter>("all");
  const visible = phase === "all" ? WEEKLY_LOG : WEEKLY_LOG.filter((e) => e.phase === phase);

  return (
    <section id="timeline" className="section-rule scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          05 · Development Log
        </p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Weekly Engineering Progress
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Documented progression from initial PyTorch network architecture and 8-bit
              quantization through Verilog module design, hex weight export, and comparative
              analysis.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter log by phase">
            {PHASE_TABS.map((tab) => {
              const active = phase === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPhase(tab.id)}
                  className={
                    active
                      ? "rounded-md border border-primary/60 bg-primary/15 px-3 py-1.5 font-mono text-xs font-medium text-foreground"
                      : "rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground"
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {visible.map((entry) => (
            <article
              key={entry.week}
              className="grid gap-4 rounded-xl border border-border bg-surface p-5 md:grid-cols-[120px_1fr_1fr]"
            >
              <div>
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  Week {entry.week.toString().padStart(2, "0")}
                </div>
                <div className="mt-1 font-mono text-[11px] capitalize text-muted-foreground">
                  {entry.phase}
                </div>
              </div>

              <div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {entry.goal}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{entry.work}</p>
              </div>

              <div className="border-t border-border pt-3 md:border-t-0 md:border-l md:pt-0 md:pl-5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-signal">
                  Outcome
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/90">{entry.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}