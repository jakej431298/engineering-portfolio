import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const NAV_ITEMS = [
  { label: "Overview", to: "/" as const },
  { label: "FPGA vs. GPU", to: "/projects/fpga-vs-gpu" as const },
  { label: "Future Project 2", to: "/projects/future-project-2" as const },
  { label: "Future Project 3", to: "/projects/future-project-3" as const },
];

export function PortfolioShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-baseline gap-3">
            <span className="font-display text-base font-bold tracking-tight text-foreground">
              JAKE JULIUS
            </span>
            <span className="hidden font-mono text-xs tracking-wider text-primary sm:inline">
              / ENGINEERING
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground border-primary/50" }}
                inactiveProps={{
                  className: "text-muted-foreground hover:text-foreground border-transparent",
                }}
                className="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground hover:text-foreground md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-border bg-surface px-4 py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "bg-secondary text-foreground" }}
                  inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                  className="rounded-md px-3 py-2 text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-mono text-xs tracking-wide text-foreground">
            JAKE JULIUS · ENGINEERING RESEARCH PORTFOLIO
          </p>
          <p className="text-xs">Livingston High School · Electrical Engineering</p>
        </div>
      </footer>
    </div>
  );
}