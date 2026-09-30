export interface AILabExperiment {
  id: string;
  code: string;
  category: "AGENTIC AI" | "GEOSPATIAL AI" | "COMPUTER VISION" | "DATA ANALYSIS" | "MODEL EXPERIMENTS" | "AI APPLICATIONS";
  title: string;
  status: "ACTIVE EXPERIMENT" | "BENCHMARKED" | "STREAMING" | "PROTOTYPE";
  description: string;
  hypothesis: string;
  interactiveType: "agent-pipeline" | "ndvi-slider" | "bounding-box" | "token-stream" | "feature-weights" | "route-eval";
  parameters: { name: string; value: string }[];
  tags: string[];
}

export const aiLabExperiments: AILabExperiment[] = [
  {
    id: "exp-agentic-loop",
    code: "LAB_MOD_01",
    category: "AGENTIC AI",
    title: "Autonomous Maritime Agent Decomposition",
    status: "ACTIVE EXPERIMENT",
    description: "Evaluates dynamic task decomposition across 3 specialized sub-agents: Weather Scraper, Bathymetry Analyst, and Route Synthesizer.",
    hypothesis: "Hierarchical agentic reasoning reduces decision latency by 42% compared to single monolithic LLM chains.",
    interactiveType: "agent-pipeline",
    parameters: [
      { name: "Agent Count", value: "3 Autonomous Workers" },
      { name: "Orchestration", value: "StateGraph Loop" },
      { name: "Confidence Floor", value: "0.88" },
      { name: "Fallback Routine", value: "Offline Cached Vector" },
    ],
    tags: ["Agentic AI", "Task Graph", "Multi-Agent System"],
  },
  {
    id: "exp-ndvi-radiometry",
    code: "LAB_MOD_02",
    category: "GEOSPATIAL AI",
    title: "Sentinel-2 Multi-Spectral Reflectance Ratio",
    status: "BENCHMARKED",
    description: "Real-time calculation of (NIR - Red) / (NIR + Red) across varying atmospheric cloud covers to isolate crop canopy stress in Tamil Nadu.",
    hypothesis: "Atmospheric cloud-mask thresholding prevents false negative water stress detections in delta regions.",
    interactiveType: "ndvi-slider",
    parameters: [
      { name: "NIR Band", value: "B08 (842 nm)" },
      { name: "Red Band", value: "B04 (665 nm)" },
      { name: "Resolution", value: "10-meter ground pixel" },
      { name: "Index Range", value: "-0.2 to +0.85 NDVI" },
    ],
    tags: ["Remote Sensing", "NDVI", "Cauvery Delta"],
  },
  {
    id: "exp-bounding-box-marine",
    code: "LAB_MOD_03",
    category: "COMPUTER VISION",
    title: "Marine Vessel & Hazard Detection Simulator",
    status: "STREAMING",
    description: "Spatial bounding box detector identifying small artisanal fishing trawlers vs commercial vessels from high-resolution aerial imagery.",
    hypothesis: "Multi-scale feature pyramid networks identify artisanal skiffs even amidst violent sea-foam and wave scatter.",
    interactiveType: "bounding-box",
    parameters: [
      { name: "Detector Model", value: "YOLOv8-Marine Custom" },
      { name: "mAP@50", value: "89.4%" },
      { name: "Inference Latency", value: "18.2 ms" },
      { name: "FP Suppression", value: "Ocean Mask Filter" },
    ],
    tags: ["Computer Vision", "Object Detection", "Safety"],
  },
  {
    id: "exp-token-stream",
    code: "LAB_MOD_04",
    category: "MODEL EXPERIMENTS",
    title: "Edge LLM Quantization & Token Throughput",
    status: "ACTIVE EXPERIMENT",
    description: "Benchmarking 4-bit vs 8-bit quantized language model inference throughput on edge devices for offline nautical assistant support.",
    hypothesis: "INT4 quantization achieves 3.8x throughput increase with <1.2% loss in marine query accuracy.",
    interactiveType: "token-stream",
    parameters: [
      { name: "Quant Scheme", value: "AWQ / GGUF 4-bit" },
      { name: "Context Window", value: "4,096 tokens" },
      { name: "RAM Footprint", value: "3.2 GB" },
      { name: "Tokens / Sec", value: "48.2 tok/s" },
    ],
    tags: ["Quantization", "Edge AI", "Inference Speed"],
  },
  {
    id: "exp-crop-yield-shap",
    code: "LAB_MOD_05",
    category: "DATA ANALYSIS",
    title: "SHAP Feature Attribution on Soil Nutrients",
    status: "BENCHMARKED",
    description: "Explainable AI pipeline decomposing the impact of Nitrogen, Phosphorus, Potassium, rainfall, and thermal units on harvest yield variance.",
    hypothesis: "Local soil moisture retention is the primary determinant of yield variability across semi-arid Tamil Nadu tracts.",
    interactiveType: "feature-weights",
    parameters: [
      { name: "Features Evaluated", value: "18 Agronomic Factors" },
      { name: "Explainer", value: "TreeSHAP" },
      { name: "R² Baseline", value: "0.914" },
      { name: "Variance Explained", value: "87.6%" },
    ],
    tags: ["Explainable AI", "SHAP", "Agriculture"],
  },
  {
    id: "exp-route-eval",
    code: "LAB_MOD_06",
    category: "AI APPLICATIONS",
    title: "A* Nautical Hazard Avoidance Mesh",
    status: "PROTOTYPE",
    description: "Real-time pathfinding routing algorithm dynamically generating waypoints around sudden cyclone advisory polygons and international maritime boundary lines.",
    hypothesis: "Heuristic weighting of wave heights reduces vessel rolling motion by 35% without adding more than 6% to route length.",
    interactiveType: "route-eval",
    parameters: [
      { name: "Path Algorithm", value: "Constrained A* Dynamic" },
      { name: "Grid Resolution", value: "0.05° Lat/Long" },
      { name: "Computation Time", value: "42 ms" },
      { name: "Hazard Margin", value: "5.0 Nautical Miles" },
    ],
    tags: ["Navigation", "Spatial Mesh", "Safety"],
  },
];
