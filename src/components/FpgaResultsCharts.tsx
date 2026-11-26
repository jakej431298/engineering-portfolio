import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ACCURACY_CHART_DATA,
  BENCHMARK_ROWS,
  ENERGY_CHART_DATA,
  LATENCY_CHART_DATA,
  POWER_CHART_DATA,
} from "@/data/fpga-project";

interface Datum {
  label: string;
  value: number;
  kind: string;
}

interface MetricChartCardProps {
  title: string;
  subtitle: string;
  unit: string;
  data: Datum[];
  domainMax?: number;
  domainMin?: number;
  mounted: boolean;
}

function MetricChartCard({
  title,
  subtitle,
  unit,
  data,
  domainMax,
  domainMin = 0,
  mounted,
}: MetricChartCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      <div className="mt-5 h-56 w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 4 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <YAxis
                domain={domainMax !== undefined ? [domainMin, domainMax] : [domainMin, "auto"]}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "oklch(0.28 0.035 252 / 35%)" }}
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--muted-foreground)", marginBottom: "4px" }}
                itemStyle={{ color: "var(--foreground)", fontWeight: 500 }}
                formatter={(val: number) => [`${val} ${unit}`, title]}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={56}>
                {data.map((entry) => (
                  <Cell
                    key={entry.label}
                    fill={entry.kind === "fpga" ? "var(--chart-2)" : "var(--chart-1)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-md bg-background/40 font-mono text-xs text-muted-foreground">
            Loading chart…
          </div>
        )}
      </div>
    </div>
  );
}

export function FpgaResultsCharts() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="results" className="section-rule scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              04 · Results &amp; Analysis
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Performance, Power, and Energy Comparison
            </h2>
          </div>

          <div className="flex items-center gap-5 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-xs bg-chart-1" /> NVIDIA T4 GPU (Measured)
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-xs bg-chart-2" /> Artix-7 FPGA (Simulated / Est.)
            </span>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-caution/40 bg-caution/8 p-5 sm:p-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-caution">
            Key Engineering Finding · Lower Power Does Not Automatically Mean Lower Energy
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
            Although the Artix-7 FPGA design draws roughly <strong>8× less estimated power</strong>{" "}
            (~3.5 W vs. 27 W active average) with deterministic timing (&lt;0.01 ms jitter), its
            sequential single-MAC architecture takes ~3.3 ms per image versus 0.22 ms on the T4. As
            a result, estimated energy per inference is higher on the current FPGA design (11.55 mJ
            vs. 5.94 mJ at batch=1), challenging part of the original hypothesis and pointing
            directly to parallel MAC arrays as the critical next optimization.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <MetricChartCard
            title="Inference Latency"
            subtitle="Lower is faster (milliseconds per sample)"
            unit="ms"
            data={LATENCY_CHART_DATA}
            mounted={mounted}
          />
          <MetricChartCard
            title="Active Power Consumption"
            subtitle="Measured T4 active average vs. Xilinx Power Estimator"
            unit="W"
            data={POWER_CHART_DATA}
            mounted={mounted}
          />
          <MetricChartCard
            title="Classification Accuracy"
            subtitle="MNIST test accuracy across numeric formats (%)"
            unit="%"
            data={ACCURACY_CHART_DATA}
            domainMin={90}
            domainMax={100}
            mounted={mounted}
          />
          <MetricChartCard
            title="Energy per Inference"
            subtitle="Power × latency (millijoules per sample, lower is better)"
            unit="mJ"
            data={ENERGY_CHART_DATA}
            mounted={mounted}
          />
        </div>

        <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-elevated font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3.5">Metric</th>
                <th className="px-4 py-3.5">NVIDIA T4 GPU (Colab)</th>
                <th className="px-4 py-3.5">Artix-7 FPGA (Simulated)</th>
                <th className="px-4 py-3.5 text-right">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {BENCHMARK_ROWS.map((row) => (
                <tr key={row.metric} className="hover:bg-background/40">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.metric}
                    {row.note && (
                      <span className="block font-mono text-[11px] text-muted-foreground">
                        {row.note}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.gpu}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.fpga}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={
                        row.advantage === "FPGA"
                          ? "inline-block rounded bg-signal/15 px-2 py-0.5 font-mono text-xs font-medium text-signal"
                          : "inline-block rounded bg-primary/15 px-2 py-0.5 font-mono text-xs font-medium text-primary"
                      }
                    >
                      {row.advantage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Notes: T4 active inference averaged 27 W under nvidia-smi polling (T4 board TDP is 70 W).
          FPGA power (~3.5 W) is estimated via Xilinx Power Estimator, latency (~3.3 ms) is
          modeled from MAC cycle counts, and CO₂ estimates apply the U.S. EIA 2024 grid rate of
          785 lb CO₂/MWh.
        </p>
      </div>
    </section>
  );
}