import cameraImage from "../src/Assets/Projects/clic.png";
import caveImage from "../src/Assets/Projects/PI3D.png";
import retailImage from "../src/Assets/Projects/retailanalysis.png";
import mapsImage from "../src/Assets/Projects/maps.png";
import trafficImage from "../src/Assets/Projects/trafficlights.png";
import reveasyImage from "../src/Assets/Projects/reveasy.png";
import postgresImage from "../src/Assets/Projects/PostegreSQL.png";
import heartImage from "../src/Assets/Projects/tipe.png";

export const chapters = [
  {
    id: "intro",
    short: "Overview",
    label: "00 / A FIELD GUIDE TO MY WORK",
    title: "From pixels to",
    accent: "possibilities.",
    subtitle:
      "I’m Abdelmouhaimen. I build machines that see, systems that understand, and AI that gets things done.",
    tags: ["Computer vision", "Physical AI", "Applied intelligence"],
  },
  {
    id: "physical-ai",
    short: "Physical AI",
    label: "01 / INTELLIGENCE, OFF THE SCREEN",
    title: "The real world",
    accent: "is the test.",
    subtitle:
      "From drone perception at Parrot to hands-on robotics experiments. Turning model outputs into something a physical system can use.",
    tags: ["Embedded perception", "Stereo depth", "Robotics"],
  },
  {
    id: "spatial",
    short: "Spatial vision",
    label: "02 / PIXELS → PLACES → MEANING",
    title: "Give cameras",
    accent: "a common ground.",
    subtitle:
      "I built ManySight to connect local vision, multi-camera geometry, and AI agents. A camera sees a frame. A system should understand a space.",
    tags: ["ManySight", "Multi-camera geometry", "MCP + Python SDK"],
  },
  {
    id: "learning",
    short: "Machine learning",
    label: "03 / A BETTER QUESTION. A BETTER MODEL.",
    title: "Look closer.",
    accent: "Question the score.",
    subtitle:
      "From pedestrian behaviour to satellite imagery, I care about what models learn, how we evaluate them, and where they fail.",
    tags: ["Foundation models", "Honest evaluation", "Applied research"],
  },
  {
    id: "agents",
    short: "Voice & agents",
    label: "04 / FROM A CONVERSATION TO AN ACTION",
    title: "AI should do",
    accent: "more than reply.",
    subtitle:
      "With Sotiby, I’m building voice agents that connect conversations to appointments, business tools, and useful actions.",
    tags: ["Voice AI", "Workflow orchestration", "Product building"],
  },
];

export const projects = [
  {
    id: "manysight",
    period: { start: "2026" },
    title: "ManySight",
    type: "Independent · Open source",
    category: ["Vision", "Agents", "Geometry"],
    visual: "spatial",
    featured: true,
    kicker: "SPATIAL INTELLIGENCE",
    summary: "From camera streams to a shared understanding of physical space.",
    stack: ["Python", "Computer vision", "MCP", "Camera calibration"],
    problem:
      "Video streams are easy to collect and difficult to reason about across a physical space. Running a heavy vision-language model on every frame is an expensive starting point.",
    approach:
      "I built a perception-to-agent pipeline around local detection and tracking, calibrated cameras, and geometric reasoning. Observations become structured spatial state that agents can query through an MCP server, skills, and a Python SDK.",
    note: "Independent, open-source project. The scene on this site illustrates the spatial-intelligence architecture.",
    links: [
      { label: "Explore ManySight", url: "https://manysight.com" },
      {
        label: "Source code",
        url: "https://github.com/abdelmouhaimen/ManySight",
      },
    ],
  },
  {
    id: "sotiby",
    period: { start: "2026-10", ongoing: true },
    title: "Sotiby",
    type: "Co-founder · Software & ML Engineer",
    category: ["Agents", "Products"],
    visual: "voice",
    featured: true,
    kicker: "VOICE → ACTION",
    summary: "Voice agents that move a conversation into a business workflow.",
    stack: ["Voice AI", "Phone integration", "APIs", "Agent workflows"],
    problem:
      "A helpful phone interaction needs more than an answer: it may need to book an appointment, check a system, or complete a concrete task.",
    approach:
      "I co-build an end-to-end voice-agent platform with phone-number integration, conversation orchestration, appointment scheduling, and API-based actions. The product explores Darija, French, and Arabic business interactions.",
    note: "Early MVP launched in October 2026. Demo on demand.",
    links: [
      { label: "Explore Sotiby", url: "https://sotiby.com" },
      { label: "Meet the team", url: "https://sotiby.com/equipe" },
    ],
  },
  {
    id: "pedestrian",
    period: { start: "2025-03", end: "2025-07" },
    title: "Reading pedestrian behaviour",
    type: "Research internship · Renault / Ampere",
    category: ["Vision", "Research"],
    visual: "learning",
    featured: true,
    kicker: "BEHAVIOUR-AWARE PERCEPTION",
    summary:
      "Pretrained visual models, contextual crops, and a harder look at evaluation.",
    stack: ["DINOv2", "CLIP / SigLIP2", "YOLO / RF-DETR", "PIE dataset"],
    problem:
      "Recognising whether a pedestrian is looking, walking, or crossing depends on visual context. Highly similar frames can also make a validation result look better than its actual generalisation.",
    approach:
      "During my end-of-studies internship at Renault Group / Ampere Software Technology, I explored pretrained-model adaptation and context-dependent crops. I corrected frame-identity leakage with pedestrian-ID-disjoint validation and compared models with attention to imbalance and failure modes.",
    note: "March–July 2025. Internal research report, not a peer-reviewed publication. No headline accuracy is presented because the evaluation protocols differ.",
    links: [],
  },
  {
    id: "compressed-camera",
    period: { start: "2024-10", end: "2025-03" },
    title: "A camera that sends less",
    type: "Computer vision project · IRIT",
    category: ["Vision", "Research"],
    visual: "image",
    image: cameraImage,
    featured: true,
    kicker: "RESOURCE-AWARE VISION",
    summary:
      "Adaptive sampling and learned reconstruction for bandwidth-constrained images.",
    stack: ["Python", "Deep learning", "Compressed sensing", "Streamlit"],
    problem:
      "Sending full images is costly when a drone’s communication bandwidth is constrained. Can sampling and reconstruction work together to preserve useful visual information?",
    approach:
      "I implemented NetM for adaptive mask generation and NetE for inpainting-based reconstruction, with an iterative refinement loop and a Streamlit interface for monitoring the process.",
    note: "IRIT, October 2024–March 2025. Research prototype for bandwidth-constrained imaging.",
    links: [
      { label: "Source code", url: "https://github.com/Abdelmouhaimen/CLIC" },
    ],
  },
  {
    id: "kvesty",
    title: "Kvesty / Daregram",
    type: "Independent · Full-stack product",
    category: ["Products"],
    visual: "product",
    kicker: "IDEA → COMPLETE SYSTEM",
    summary:
      "A social challenge platform, from mobile interactions to real-time infrastructure.",
    stack: ["TypeScript", "React Native / Expo", "GraphQL", "PostgreSQL"],
    problem:
      "Challenges, proof submissions, communities, and conversations need to fit into one coherent product, with permissions and media workflows working throughout.",
    approach:
      "I built a React Native/Expo app, a Next.js companion, and a GraphQL/Prisma backend. The implementation includes real-time messaging, map-based discovery, geolocation-verified submissions, authentication, media uploads, and moderation workflows.",
    note: "Independent full-stack product implementation.",
    links: [{ label: "Visit Kvesty", url: "https://kvesty.com" }],
  },
  {
    id: "robotics",
    period: { start: "2026-08", end: "2026-09" },
    title: "An arm on the workbench",
    type: "Personal · Hands-on experiments",
    category: ["Vision"],
    visual: "robot",
    kicker: "PHYSICAL AI NOTEBOOK",
    summary:
      "Exploring an SO-101 arm, LeRobot, and WebXR teleoperation tooling.",
    stack: ["SO-101", "LeRobot", "Vuer", "WebXR"],
    problem:
      "Robotics quickly becomes a systems problem: tools, networks, hardware constraints, and the physical environment all need to agree.",
    approach:
      "I experimented with an SO-101 robotic arm and LeRobot tooling, including Vuer/Pyroki teleoperation setup, WebXR compatibility research, and WSL/LAN connectivity debugging.",
    note: "Personal robotics and teleoperation experiments.",
    links: [],
  },
  {
    id: "satellite",
    period: { start: "2024-06", end: "2024-09" },
    title: "Water, seen from orbit",
    type: "Deep learning internship · GET-OMP / CNRS",
    category: ["Vision", "Research"],
    visual: "satellite",
    kicker: "EARTH OBSERVATION",
    summary:
      "Attention U-Net segmentation and temporal analysis of West African water bodies.",
    stack: ["U-Net", "Landsat", "GDAL / QGIS", "NDWI / MNDWI"],
    problem:
      "Long-running satellite archives contain hydrological information, but extracting comparable water-body observations requires careful preprocessing and segmentation.",
    approach:
      "I developed an attention U-Net workflow for Landsat imagery, integrated water indices into geospatial pipelines, and explored temporal changes using imagery dating back to 1984.",
    note: "GET-OMP / CNRS internship, June–September 2024.",
    links: [
      {
        label: "Source code",
        url: "https://github.com/Abdelmouhaimen/DL4SahelLakes/",
      },
    ],
  },
  {
    id: "compression",
    period: { start: "2023-06", end: "2023-07" },
    title: "Compute on compressed data",
    type: "Research · ENAC · ICT4S 2024",
    category: ["Research"],
    visual: "research",
    kicker: "ENERGY-AWARE COMPUTING",
    summary: "Investigating the energy cost of scientific matrix operations.",
    stack: ["C / C++", "blaz", "zfp", "PowerJoular"],
    problem:
      "Compression changes storage cost, but what happens to energy consumption when scientific operations work directly on compressed matrix data?",
    approach:
      "At ENAC, I evaluated compressed and uncompressed matrix-computation workflows with energy monitoring. This work connects to the ICT4S 2024 paper “Energy Efficient Matrix Computations Through Homomorphic Compression”.",
    note: "Co-authors in published order: Matthieu Martel, Célia Picard, Abdelmouhaimen Sarhane. ENAC internship, June–July 2023. The associated report is distinct from the peer-reviewed paper.",
    links: [
      {
        label: "Read the paper",
        url: "https://doi.org/10.1109/ICT4S64576.2024.00020",
      },
      { label: "Source code", url: "https://github.com/abdelmouhaimen/NRJ" },
    ],
  },
  {
    id: "cave",
    title: "Reconstructing the Chauvet replica",
    type: "Academic · Geometric vision",
    category: ["Geometry", "Vision"],
    visual: "image",
    image: caveImage,
    kicker: "3D GEOMETRY",
    summary:
      "Reconstruction, projector calibration, and alignment on a complex surface.",
    stack: ["SfM", "MVS", "Zhang calibration", "ICP"],
    problem:
      "Aligning projected prehistoric paintings with the geometry of a cave replica requires a reliable relation between the projector, surface, and reconstructed scene.",
    approach:
      "We used SfM and MVS to reconstruct the replica, treated a projector as an inverse camera for calibration, and used ICP with scale adjustment to align the models.",
    note: "Academic geometric-vision project on a replica of the Chauvet Cave.",
    links: [
      {
        label: "Source code",
        url: "https://github.com/Abdelhakimourkia/BE_Pi_3D",
      },
    ],
  },
  {
    id: "clinical",
    title: "Clinical documentation & RAG",
    type: "Product project",
    category: ["Agents", "Products"],
    visual: "clinical",
    kicker: "APPLIED LANGUAGE SYSTEMS",
    summary:
      "Structured visit notes and document-grounded patient conversations.",
    stack: ["LangChain", "LlamaIndex", "RAG", "React / TypeScript"],
    problem:
      "Clinical notes and patient documents are fragmented. A useful interface needs structured documentation and retrieval of relevant context.",
    approach:
      "I implemented transcription-to-report workflows and a document-grounded chatbot over patient records, with a React interface and PostgreSQL-backed infrastructure.",
    note: "A document-processing and retrieval implementation for clinical workflows.",
    links: [{ label: "Project website", url: "https://cabinetplus.ma" }],
  },
  {
    id: "polymer",
    title: "Polymer AI Formulator",
    type: "Junior entreprise mission · Teknor Apex × OSS Ventures",
    category: ["Research", "Products"],
    visual: "polymer",
    kicker: "DATA → A TECHNICAL ROADMAP",
    summary:
      "Data modelling and ML feasibility for material-formulation design.",
    stack: ["PCA", "Clustering", "Data quality", "ML feasibility"],
    problem:
      "Formulation knowledge is distributed across materials, properties, and test results. Model selection needs a sound data foundation and interpretable relationships.",
    approach:
      "I structured formulation data into a standard model, explored PCA, clustering, and correlations, then assessed generative, optimisation, and hybrid ML/physics approaches. The output was a feasibility assessment and technical roadmap.",
    note: "A data-modelling mission, feasibility assessment, and technical roadmap.",
    links: [],
  },
  {
    id: "retail",
    period: { start: "2024" },
    title: "Customer behaviour, in space",
    type: "Independent · Vision prototype",
    category: ["Vision", "Geometry"],
    visual: "image",
    image: retailImage,
    kicker: "AN EARLY SPATIAL EXPLORATION",
    summary: "Detection, movement tracking, and floor-plan heatmaps.",
    stack: ["YOLO", "Roboflow", "Supervision", "Perspective transforms"],
    problem:
      "Movement in a camera view needs to be transformed into an interpretable view of the physical floor.",
    approach:
      "I built a prototype for customer movement tracking and heatmaps using detections and 2D perspective transforms, and explored the next questions around multi-camera tracking and person re-identification.",
    note: "Prototype; multi-camera re-identification was an exploration at this stage.",
    links: [
      {
        label: "Source code",
        url: "https://github.com/Abdelmouhaimen/Behavior_Analysis_YOLO",
      },
    ],
  },
  {
    id: "maps",
    title: "Less mesh. More structure.",
    type: "Academic · Surface processing",
    category: ["Geometry"],
    visual: "image",
    image: mapsImage,
    kicker: "MULTIRESOLUTION SURFACES",
    summary: "3D surface compression and remeshing with MAPS.",
    stack: ["Python", "MAPS", "Delaunay triangulation"],
    problem:
      "A dense 3D surface contains more geometry than every view or processing step needs.",
    approach:
      "I explored progressive vertex removal, constrained Delaunay retriangulation, and adaptive surface parameterisation through a Multiresolution Adaptive Parameterization of Surfaces approach.",
    note: "Academic implementation of multiresolution surface processing.",
    links: [
      {
        label: "Source code",
        url: "https://github.com/Abdelmouhaimen/CSI_3D_MAPS_N7",
      },
    ],
  },
  {
    id: "traffic",
    title: "Learning the signs",
    type: "Academic · Deep learning",
    category: ["Vision"],
    visual: "image",
    image: trafficImage,
    kicker: "IMAGE CLASSIFICATION",
    summary: "A traffic-sign recognition workflow with CNNs and VGG16.",
    stack: ["Python", "TensorFlow", "VGG16"],
    problem:
      "Recognising signs means learning useful visual distinctions across a labelled image collection.",
    approach:
      "I worked on data collection and a CNN/VGG16 fine-tuning workflow for traffic-sign classification.",
    note: "Academic project; accuracy numbers omitted because the old portfolio did not establish the evaluation split.",
    links: [
      {
        label: "Source code",
        url: "https://github.com/Abdelmouhaimen/DL-TrafficSignClassification",
      },
    ],
  },
  {
    id: "reveasy",
    title: "RevEasy",
    type: "Group project · Learning tools",
    category: ["Products"],
    visual: "image",
    image: reveasyImage,
    kicker: "LEARNING TOOLS",
    summary: "Review sheets, flashcards, and quizzes in a desktop application.",
    stack: ["Java", "Swing"],
    problem:
      "Study materials are more useful when they can be revisited and tested in the same place.",
    approach:
      "I contributed to a group application that organises learning content into review sheets, flashcards, and quizzes.",
    note: "Academic group project.",
    links: [
      { label: "Source code", url: "https://github.com/PSOMSON/RevEasy" },
    ],
  },
  {
    id: "postgres",
    title: "PostgreSQL Browser",
    type: "CS50x · Final project",
    category: ["Products"],
    visual: "image",
    image: postgresImage,
    kicker: "DEVELOPER TOOLS",
    summary: "A friendlier web interface for browsing and editing a database.",
    stack: ["Python", "Flask", "PostgreSQL", "JavaScript"],
    problem:
      "Direct database administration can be cumbersome for a simple inspection or edit.",
    approach:
      "I built a Flask-based administration interface with HTML, CSS, and JavaScript for viewing and editing PostgreSQL data.",
    note: "CS50x final project.",
    links: [
      {
        label: "Source code",
        url: "https://github.com/Abdelmouhaimen/browser",
      },
    ],
  },
  {
    id: "heart",
    title: "A heartbeat, made visible",
    type: "Preparatory classes · TIPE",
    category: ["Research"],
    visual: "image",
    image: heartImage,
    kicker: "HARDWARE CURIOSITY",
    summary:
      "A photoplethysmography sensor built from light, electronics, and code.",
    stack: ["IR LED", "Photodiode", "Analog circuits", "Arduino"],
    problem:
      "A changing optical signal contains a pulse, together with noise and a much larger constant component.",
    approach:
      "I built an infrared LED/photodiode sensor and an analog signal-conditioning circuit, then used Arduino postprocessing to visualise heart rate.",
    note: "Educational photoplethysmography and signal-processing experiment.",
    links: [],
  },
  {
    id: "multimodal",
    title: "The geometry & signals notebook",
    type: "Academic · ENSEEIHT",
    category: ["Geometry", "Vision", "Research"],
    visual: "geometry",
    kicker: "FOUNDATIONS, IN PRACTICE",
    summary:
      "From image stitching and 3D rendering to audio separation and compilers.",
    stack: ["SIFT / homography", "NMF / U-Net", "Java", "OCaml"],
    problem:
      "A practical understanding of multimodal systems comes from implementing and connecting their underlying methods.",
    approach:
      "Academic projects include SIFT/homography image stitching, KLT tracking, K-means and SLIC segmentation, audio source separation, a Java 3D renderer, 3D inverse problems, an OCaml compiler, and a document RAG chatbot.",
    note: "A collection of academic implementations, not a single production platform.",
    links: [],
  },
];

export const experience = [
  {
    period: { start: "2025-09", ongoing: true },
    company: "Parrot Drones",
    role: "Computer Vision & Embedded Deep Learning Engineer",
    detail:
      "Drone perception from Python prototypes to production C++, stereo depth, model optimisation with Qualcomm AIMET, offline evaluation, and field debugging.",
    tags: ["Perception", "Embedded ML", "C++"],
  },
  {
    period: { start: "2025-03", end: "2025-07" },
    company: "Renault Group / Ampere",
    role: "AI Research · Semantic Scene Perception",
    detail:
      "End-of-studies research in behaviour-aware scene understanding, pretrained-model adaptation, and careful evaluation for driving scenes.",
    tags: ["Applied research", "Foundation models"],
  },
  {
    period: { start: "2024-10", end: "2025-03" },
    company: "IRIT",
    role: "Computer Vision & Embedded Systems Developer",
    detail:
      "Adaptive compressed-sensing camera: learned sampling masks, inpainting-based reconstruction, and interactive monitoring.",
    tags: ["Compressed sensing", "Deep learning"],
  },
  {
    period: { start: "2024-06", end: "2024-09" },
    company: "GET-OMP / CNRS",
    role: "Deep Learning Intern · Satellite Image Processing",
    detail:
      "Attention U-Net water-body segmentation, Landsat time-series analysis, and geospatial pipelines with GDAL and QGIS.",
    tags: ["Earth observation", "Segmentation"],
  },
  {
    period: { start: "2023-06", end: "2023-07" },
    company: "ENAC",
    role: "HPC & Data Analysis Intern",
    detail:
      "Scientific matrix computing on compressed data and energy monitoring. Co-author of the resulting ICT4S 2024 paper.",
    tags: ["Scientific computing", "Energy efficiency"],
  },
];

export const skillGroups = [
  {
    title: "Perception & learning",
    text: "PyTorch / Lightning · OpenCV · DINOv2 · YOLO · RF-DETR · Stereo vision · Model evaluation",
  },
  {
    title: "Geometry & physical systems",
    text: "Calibration · SfM / MVS · ICP · Multi-camera reasoning · Qualcomm AIMET · SO-101 / LeRobot experiments",
  },
  {
    title: "Agents & products",
    text: "MCP · Voice agents · RAG · FastAPI / Flask · React / TypeScript · React Native · GraphQL · PostgreSQL",
  },
  {
    title: "Engineering foundations",
    text: "Python · C++ · SQL · Java · MLflow · GCP · GDAL / QGIS · ROS 2",
  },
];
