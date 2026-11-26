export interface BenchmarkRow {
  metric: string;
  gpu: string;
  fpga: string;
  advantage: "GPU" | "FPGA";
  note?: string;
}

export interface WeeklyLogEntry {
  week: number;
  phase: "software" | "hardware" | "verification";
  goal: string;
  work: string;
  result: string;
}

export const PROJECT_STATS = [
  { value: "109,184", label: "Network parameters", detail: "784×128 + 128×64 + 64×10" },
  { value: "3", label: "Fully connected layers", detail: "MNIST 28×28 digit classifier" },
  { value: "12", label: "Weeks of development", detail: "Software, RTL & analysis" },
  { value: "2", label: "Architectures studied", detail: "NVIDIA T4 vs. Artix-7 RTL" },
];

export const NETWORK_LAYERS = [
  {
    name: "Input Layer",
    size: 784,
    activation: "Normalized pixels",
    detail: "28 × 28 grayscale MNIST image, μ=0.1307, σ=0.3081",
    macs: null,
  },
  {
    name: "Hidden Layer 1",
    size: 128,
    activation: "ReLU",
    detail: "nn.Linear(784, 128) → 100,352 MACs",
    macs: 100352,
  },
  {
    name: "Hidden Layer 2",
    size: 64,
    activation: "ReLU",
    detail: "nn.Linear(128, 64) → 8,192 MACs",
    macs: 8192,
  },
  {
    name: "Output Layer",
    size: 10,
    activation: "Argmax",
    detail: "nn.Linear(64, 10) → 640 MACs, digits 0-9",
    macs: 640,
  },
];

export const VERILOG_MODULES = [
  {
    name: "MAC Unit",
    file: "mac_unit.v",
    role: "Executes signed 8-bit integer multiply-accumulate (weight × input + accumulator) over a 3-cycle pipeline.",
  },
  {
    name: "ReLU Activation",
    file: "relu.v",
    role: "Clamps negative signed neuron outputs to zero in combinational logic between hidden layers.",
  },
  {
    name: "Fully Connected Layer",
    file: "fc_layer.v",
    role: "Reuses a single MAC unit sequentially to evaluate arbitrary layer dimensions while minimizing DSP/LUT usage.",
  },
  {
    name: "Finite State Machine",
    file: "fc_layer.v (FSM)",
    role: "Orchestrates memory addressing, accumulator resets, MAC stepping, and layer-to-layer handoffs.",
  },
  {
    name: "Weight Memory",
    file: "weights_l1-l3.mem",
    role: "Stores quantized 8-bit hexadecimal weights exported directly from the trained PyTorch model.",
  },
  {
    name: "Argmax Classifier",
    file: "mlp_top.v",
    role: "Compares the 10 final output logits and selects the highest-scoring digit class (0-9).",
  },
];

export const LATENCY_CHART_DATA = [
  { label: "GPU (Batch 64)", value: 0.0028, kind: "gpu" },
  { label: "GPU (Batch 1)", value: 0.22, kind: "gpu" },
  { label: "FPGA (Est. Seq.)", value: 3.3, kind: "fpga" },
];

export const POWER_CHART_DATA = [
  { label: "NVIDIA T4 (Measured)", value: 27, kind: "gpu" },
  { label: "Artix-7 RTL (Estimated)", value: 3.5, kind: "fpga" },
];

export const ACCURACY_CHART_DATA = [
  { label: "GPU Float32", value: 97.26, kind: "gpu" },
  { label: "GPU Sim. Int8", value: 97.22, kind: "gpu" },
  { label: "FPGA Custom Int8", value: 94.22, kind: "fpga" },
];

export const ENERGY_CHART_DATA = [
  { label: "GPU (Batch 64)", value: 0.0756, kind: "gpu" },
  { label: "GPU (Batch 1)", value: 5.94, kind: "gpu" },
  { label: "FPGA (Est. Seq.)", value: 11.55, kind: "fpga" },
];

export const BENCHMARK_ROWS: BenchmarkRow[] = [
  { metric: "Inference Latency (batch = 1)", gpu: "0.22 ms / inference", fpga: "~3.3 ms / inference (est.)", advantage: "GPU" },
  { metric: "Inference Latency (batch = 64)", gpu: "0.0028 ms / sample", fpga: "~3.3 ms / sample (sequential)", advantage: "GPU" },
  { metric: "Latency Jitter", gpu: "±0.15 ms", fpga: "< 0.01 ms (deterministic)", advantage: "FPGA" },
  { metric: "Active Power Consumption", gpu: "27 W measured", fpga: "~3.5 W estimated (XPE)", advantage: "FPGA" },
  { metric: "Power Ratio", gpu: "1× baseline", fpga: "~8× lower power draw", advantage: "FPGA" },
  { metric: "Energy per Task (batch = 1)", gpu: "~5.94 mJ / inference", fpga: "~11.55 mJ / inference (est.)", advantage: "GPU" },
  { metric: "Energy per Task (batch = 64)", gpu: "~0.0756 mJ / sample", fpga: "~11.55 mJ / inference (est.)", advantage: "GPU" },
  { metric: "Classification Accuracy", gpu: "97.26% FP32 · 97.22% sim Int8", fpga: "94.22% custom quantization", advantage: "GPU" },
  { metric: "Estimated Cost per 1M Inferences", gpu: "~$0.11 (cloud estimate)", fpga: "~$0.002 (edge estimate)", advantage: "FPGA" },
  { metric: "Reconfigurability", gpu: "High (software updates)", fpga: "Lower (HDL edit & resynthesis)", advantage: "GPU" },
  { metric: "Est. CO₂ per 1M Inferences (batch = 1)", gpu: "~0.59 g CO₂", fpga: "~1.14 g CO₂", advantage: "GPU", note: "EIA 2024: 785 lb CO₂/MWh" },
  { metric: "Est. CO₂ per 1M Inferences (batch = 64)", gpu: "~0.0075 g CO₂", fpga: "~1.14 g CO₂ (sequential)", advantage: "GPU", note: "EIA 2024: 785 lb CO₂/MWh" },
];

export const WEEKLY_LOG: WeeklyLogEntry[] = [
  {
    week: 1,
    phase: "software",
    goal: "Project setup and architecture research",
    work: "Compared GPU vs. FPGA tradeoffs, selected Google Colab (NVIDIA T4) and EDA Playground (Xilinx Artix-7 target), and studied neural network MAC math.",
    result: "Established evaluation criteria: GPUs excel at high-throughput batched compute; FPGAs offer deterministic timing and low power for always-on edge devices.",
  },
  {
    week: 2,
    phase: "software",
    goal: "Build 3-layer PyTorch MLP architecture",
    work: "Implemented a 784 → 128 (ReLU) → 64 (ReLU) → 10 fully connected classifier using nn.Linear layers in PyTorch.",
    result: "Completed baseline software network accepting flattened 28×28 MNIST digit inputs and outputting 10 class logits.",
  },
  {
    week: 3,
    phase: "software",
    goal: "Train baseline model on MNIST",
    work: "Loaded 60,000 training images via torchvision, normalized pixel values with Normalize((0.1307), (0.3081)), and trained for 5 epochs.",
    result: "Loss decreased steadily across all 5 epochs, reaching 97.26% Float32 test accuracy as the reference baseline.",
  },
  {
    week: 4,
    phase: "software",
    goal: "Quantize 32-bit floats to 8-bit integers",
    work: "Converted network weights from Float32 to 8-bit integer precision to simplify fixed-point FPGA hardware arithmetic.",
    result: "Simulated Int8 accuracy dropped only slightly to 97.22%, confirming integer arithmetic is viable for FPGA inference.",
  },
  {
    week: 5,
    phase: "hardware",
    goal: "Benchmark NVIDIA T4 GPU inference latency",
    work: "Measured single-image (batch=1) and batched (batch=64) inference latency, median timing, and latency variation on Google Colab.",
    result: "Recorded 0.22 ms/image at batch=1 and 0.0028 ms/sample at batch=64 with ±0.15 ms jitter, demonstrating strong GPU batching dependence.",
  },
  {
    week: 6,
    phase: "hardware",
    goal: "Profile GPU power consumption",
    work: "Polled nvidia-smi every 100 ms in a background Python thread to log GPU power (W), temperature (°C), and utilization (%).",
    result: "Confirmed high active GPU power draw compared to the ~3.5 W Artix-7 estimate, supporting FPGA advantages for continuous low-power edge workloads.",
  },
  {
    week: 7,
    phase: "hardware",
    goal: "Design core Verilog MAC and ReLU modules",
    work: "Authored module mac_unit for signed integer multiply-accumulate and a ReLU activation unit to zero out negative outputs.",
    result: "Verified arithmetic blocks in simulation, confirming neuron computations decompose into reusable hardware primitives.",
  },
  {
    week: 8,
    phase: "hardware",
    goal: "Implement FSM-controlled fully connected layer",
    work: "Replaced massive parallel MAC arrays with a single MAC unit orchestrated by a finite state machine across all layer weights.",
    result: "Demonstrated area-vs-latency tradeoff: drastically reduced hardware resource footprint at the cost of sequential execution cycles.",
  },
  {
    week: 9,
    phase: "hardware",
    goal: "Assemble complete FPGA neural network pipeline",
    work: "Integrated all three fully connected layers, ReLU blocks, scaling logic, and argmax output selection into a full RTL datapath.",
    result: "Simulated end-to-end hardware inference from quantized pixel inputs to predicted digit output.",
  },
  {
    week: 10,
    phase: "verification",
    goal: "Export trained PyTorch weights to Verilog memory",
    work: "Wrote a Python export script converting trained 8-bit integer weights into Verilog-compatible hexadecimal .mem files.",
    result: "Enabled the simulated FPGA circuit to load the exact trained parameters from PyTorch without retraining.",
  },
  {
    week: 11,
    phase: "verification",
    goal: "Verify timing, accuracy, and architecture tradeoffs",
    work: "Modeled sequential timing (3 cycles × 109,184 MACs × 10 ns ≈ 3.3 ms), evaluated 94.22% quantized FPGA accuracy, and compared energy and CO₂ metrics.",
    result: "Found GPU leads in batch throughput and current energy/inference, while FPGA achieves ~8× lower power, <0.01 ms jitter, and lower estimated edge cost.",
  },
];

export const REFLECTIONS = [
  {
    title: "What surprised me most",
    body: "The GPU processed images far faster, yet the FPGA required roughly 8× less estimated power. Equally surprising, lower instantaneous power did not automatically produce lower energy per inference because sequential execution took longer.",
  },
  {
    title: "Biggest obstacle overcome",
    body: "Translating a neural network from high-level Python into Verilog hardware required reasoning explicitly about fixed-point math, hexadecimal weight storage, finite state machine control, and clock-cycle timing.",
  },
  {
    title: "What I would do differently",
    body: "Deploy and benchmark on a physical Artix-7 FPGA board instead of relying on simulation and power estimation, and align the Python and Verilog quantization math so accuracy comparisons are strictly apples-to-apples.",
  },
  {
    title: "What I want to explore next",
    body: "Measure real hardware power and end-to-end cycle counts on physical silicon, then introduce parallel MAC arrays to cut FPGA inference latency without sacrificing its low-power profile.",
  },
];

export const LIMITATIONS = [
  "Deploy the RTL architecture onto a physical Xilinx Artix-7 board and measure live wall-socket / rail power.",
  "Measure exact end-to-end start-to-done clock cycles in full top-level simulation rather than multiplying isolated MAC latency.",
  "Unify fixed-point weight and activation scaling between PyTorch and Verilog to close the 97.22% vs. 94.22% quantization gap.",
  "Explore parallel MAC units and pipelined layer execution to bring FPGA energy per inference below GPU batch-1.",
];

export const SOURCES = [
  { title: "Verilog Tutorials and Examples", org: "Nandland", usage: "Learned Verilog RTL syntax and digital hardware design patterns." },
  { title: "FPGAs vs. GPUs", org: "IBM", usage: "Reviewed architectural tradeoffs between GPU parallelism and FPGA custom logic." },
  { title: "Training with PyTorch", org: "PyTorch", usage: "Built training loops, loss functions, and optimization for the MNIST MLP." },
  { title: "MNIST Dataset Documentation", org: "PyTorch & torchvision", usage: "Loaded, split, and normalized the 60,000 handwritten digit dataset." },
  { title: "NVIDIA System Management Interface (nvidia-smi)", org: "NVIDIA", usage: "Monitored real-time GPU power, temperature, and utilization during inference." },
  { title: "Xilinx Power Estimator (XPE)", org: "AMD / Xilinx", usage: "Referenced to estimate Artix-7 FPGA power draw (~3.5 W) for comparison." },
  { title: "United States Electricity Profile 2024", org: "U.S. Energy Information Administration", usage: "Applied the U.S. grid emission factor (785 lb CO₂/MWh) to estimate CO₂ per 1M inferences." },
];