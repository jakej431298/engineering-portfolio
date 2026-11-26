import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Cpu } from "lucide-react";

interface FutureProjectTemplateProps {
  projectNumber: number;
}

export function FutureProjectTemplate({ projectNumber }: FutureProjectTemplateProps) {
  return (
    <section className="lab-grid relative flex min-h-[75vh] items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-xl border border-border bg-surface/95 p-8 sm:p-12">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
          <Cpu className="h-4 w-4" aria-hidden="true" />
          <span>Project Slot 0{projectNumber} · Template</span>
        </div>

        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Future Project {projectNumber}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          This page is reserved as a template for an upcoming independent engineering project.
          Documentation, system architecture, experimental data, and conclusions will be added here
          upon completion.
        </p>

        <div className="mt-8 grid gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:grid-cols-3">
          <div>
            <div className="text-foreground">STATUS</div>
            <div className="mt-1">Planned</div>
          </div>
          <div>
            <div className="text-foreground">PORTFOLIO SLOT</div>
            <div className="mt-1">Project 0{projectNumber}</div>
          </div>
          <div>
            <div className="text-foreground">RESEARCHER</div>
            <div className="mt-1">Jake Julius</div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Portfolio
          </Link>
          <Link
            to="/projects/fpga-vs-gpu"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View Completed Project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}