# Jake Julius | Engineering Portfolio

An electrical engineering portfolio presenting Jake Julius's independent research, technical development, and project reflections at Livingston High School. Created for college admissions reviewers and readers interested in computer architecture and efficient computing.

## Featured Research

### FPGAs vs. GPUs in AI Systems

A study of MNIST neural-network inference comparing measured NVIDIA T4 GPU performance with a simulated Xilinx Artix-7 FPGA architecture implemented in Verilog.

The project page documents:

- Neural-network architecture and hardware modules
- Research methodology and benchmark results
- Interactive performance charts and comparison tables
- An 11-week research log
- Engineering reflections, limitations, and sources

GPU measurements and FPGA simulation results are identified separately; simulated results do not represent measurements from a physical FPGA board.

## Portfolio Pages

| Page | Path |
| --- | --- |
| Portfolio overview | `/` |
| FPGA vs. GPU research | `/projects/fpga-vs-gpu` |
| Future Project 2 | `/projects/future-project-2` |
| Future Project 3 | `/projects/future-project-3` |

The future-project pages are reserved templates, not completed projects.

## Technology

- TanStack Start and TanStack Router
- React and TypeScript
- Tailwind CSS
- Recharts for research visualizations
- Vitest for automated tests

## Local Development

Install Bun, then run these commands from the repository root:

```sh
bun install
bun run dev
```

Open the local address printed by the development server.

```sh
bun run test     # Run automated tests
bun run lint     # Check code quality
bun run build    # Create a production build
```

## Project Organization

- `src/routes/`: portfolio overview and individual project pages
- `src/data/`: structured research data
- `src/components/`: shared navigation, footer, and research displays
- `src/assets/`: portfolio imagery
- `src/styles.css`: visual theme and shared styles
- `src/test/`: automated tests

Each engineering project has its own route and research dataset. Shared navigation and footer framing remain consistent across the portfolio.
