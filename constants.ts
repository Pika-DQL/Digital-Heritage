
import { ProjectSection } from './types';
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';
import img7 from './images/7.png';
import img8 from './images/8.png';
import img9 from './images/9.png';
import img10 from './images/10.png';
import img11 from './images/11.png';
import img12 from './images/12.jpg';
import img13 from './images/13.jpg';
import img14 from './images/14.jpeg';

export const NAV_ITEMS = [
  { label: '01. Data', targetId: 'collection' },
  { label: '02. Analysis', targetId: 'analysis' },
  { label: '03. Intangible', targetId: 'intangible' },
  { label: '04. Material', targetId: 'material' },
  { label: '05. Profile', targetId: 'profile' },
];

export const HERO_DATA = {
  title: "Crafting Heritage",
  subtitle: "Digital Pathways to Classical Chinese Gardens",
  author: "Dong Qianli",
  role: "PhD Candidate | National University of Singapore & Nanjing Forestry University",
  abstract: "Bridging tradition and technology. An integrated approach for high-precision 3D surveying, heritage informatics, and the digital preservation of complex cultural heritage."
};

export const PROJECTS: ProjectSection[] = [
  {
    id: 'collection',
    title: 'Heritage Data Collection',
    subtitle: 'Systematic 3D Surveying & Cloud Platforms',
    description: "Developing a problem-oriented surveying system tailored to the complex morphology of Chinese gardens. This includes site layouts, rockeries, and individual scholar's rocks.",
    images: [
      img1,
      img2,
      img3,
      img4
    ],
    mainLink: "https://www.nature.com/articles/s40494-020-00405-z",
    details: [
      { text: "Integrated UAV & SLAM (GeoSLAM, Trimble X8) for high-efficiency mapping." },
      { text: "High-precision scanning of Taihu stones (30M+ points, <0.3mm error)." },
      { text: "Created a web-based digital platform for 300+ Jiangnan classical gardens." },
      { text: "Overcoming occlusion in narrow rockery caves through hybrid sensing." }
    ],
    tags: ["Point Cloud", "SLAM", "Photogrammetry", "Digital Archiving"]
  },
  {
    id: 'analysis',
    title: 'Digital Analysis of Heritage',
    subtitle: 'Visualizing Structure & Aesthetics',
    description: "Applying finite element analysis (FEA) and texture mapping to interpret the cultural logic and structural risks of garden rockeries.",
    images: [
      img5,
      img6,
      img7
    ],
    details: [
      { 
        text: "Visualizing 'Cunfa' (brush strokes) in 3D digital rockery models.",
        link: "https://chn.oversea.cnki.net/KCMS/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2022&filename=ZGYL202210023&uniplatform=OVERSEA&v=mBffFJE3UE0z-HwgDL5UTdvoqna0Lke2-dhfUqfQbR5LMbA-zqQ2VWqNIVm7ZhYY"
      },
      { 
        text: "Structural risk assessment: monitoring tipping and fracture zones.",
        link: "https://www.nature.com/articles/s40494-024-01355-6"
      },
      { 
        text: "3D Printing: 1:2 scale replica of Ruiguang Peak for exhibition.",
        link: "https://www.nature.com/articles/s40494-025-01582-5"
      },
      { text: "Bridging traditional aesthetic principles (Shou, Zhou, Lou, Tou) with digital metrics." }
    ],
    tags: ["FEA Simulation", "Cunfa Visualization", "3D Printing", "Structural Health"]
  },
  {
    id: 'intangible',
    title: 'Intangible Heritage',
    subtitle: 'VR & Gamified Transmission',
    description: "Documenting the living craftsmanship of rockery building and translating it into immersive digital experiences for public education.",
    images: [
      img8,
      img9,
      img10
    ],
    video: "724kNPAQR84", // YouTube ID
    details: [
      { text: "Digital documentation of construction by intangible heritage bearers." },
      { text: "Gamified learning platform simulating rockery stacking techniques." },
      { text: "VR representation of spatial logic and voids." },
      { text: "Cross-institutional workshops bridging craftsmen and scholars." }
    ],
    tags: ["Virtual Reality", "Serious Games", "Oral History", "Knowledge Graph"]
  },
  {
    id: 'material',
    title: 'Material Studies',
    subtitle: 'Micro-Analysis & Reconstruction',
    description: "Scientific investigation into the material composition of heritage elements to inform sustainable conservation practices.",
    images: [
      img11,
      img12,
      img13,
      img14
    ],
    details: [
      { text: "Microscopic analysis of traditional mortars and aggregates." },
      { text: "Experimental reconstruction of historical material mixtures." },
      { text: "Performance comparison: durability, compatibility, and aesthetics." },
      { text: "Data-driven framework for selecting restoration materials." }
    ],
    tags: ["Material Science", "Microscopy", "Conservation", "Sustainability"]
  },
  {
    id: 'profile',
    title: 'Academic Profile',
    subtitle: 'Dong Qianli | PhD Candidate',
    description: "National University of Singapore & Nanjing Forestry University\n\nPhD Candidate of Landscape Architecture\nJoint doctoral program emphasizing Digital Culture Heritage\n\nResearch Focus:\nBridging the gap between traditional craftsmanship and modern computational technologies through interdisciplinary research.",
    images: [],
    honors: [
      "Science and Technology Award – China Landscape Architecture Society (Top national award)",
      "Liangxi Forestry Science and Technology Award (Highest honor in forestry research)",
      "International Horticultural Exhibition 2024 Chengdu – Gold Award",
      "China National Scholarship (Top graduate students)",
      "CSC Scholarship – Chinese Government Scholarship Council",
      "Outstanding Contribution Award – ISOCARP"
    ],
    details: [
      { 
        text: "The texture of Chinese garden rockery stones: based on 3D point cloud and 3D printing technology. npj Heritage Science (2025).",
        link: "https://doi.org/10.1038/s40494-025-01582-5"
      },
      { 
        text: "Intangible cultural heritage based on finite element analysis: force analysis of Chinese traditional garden rockery construction. Heritage Science (2024).",
        link: "https://doi.org/10.1186/s40494-024-01355-6"
      },
      { 
        text: "3D scanning, modeling, and printing of Chinese classical garden rockeries: Zhanyuan’s South Rockery. Heritage Science (2020).",
        link: "https://doi.org/10.1186/s40494-020-00405-z"
      },
      { 
        text: "Recognition and Analysis of Cunfa in Jiangnan Private Gardens Based on 3D Point Cloud. Chinese Landscape Architecture (2022).",
        link: "https://doi.org/10.19775/j.cla.2022.10.0133"
      },
      { 
        text: "Preventive Conservation Research of Heritage Rockeries in Jiangnan Private Gardens. Heritage Architecture (2021).",
        link: "https://doi.org/10.19673/j.cnki.ha.2021.04.007"
      },
      { 
        text: "Research on the Pre-conservation of Spatial Characteristics of Humble Administrator’s Garden. Landscape Architecture Academic Journal (2020).",
        link: "https://doi.org/10.12193/j.laing.2020.12.0002.001"
      },
      {
        text: "Digital mapping and 3D printing of Jiangnan Private Gardens. The 5th International Digital Landscape Architecture Conference (2021)."
      },
      {
        text: "3D scanning reconstruction and 3D printing of classical garden rocks. The 4th International Digital Landscape Architecture Conference (2019)."
      },
      {
        text: "Application of 3D digital technology in Jiangnan Private Gardens. Jiangsu Graduate Academic Innovation Forum (2019)."
      }
    ],
    tags: ["Publications", "Awards", "Joint PhD", "Digital Heritage"]
  }
];
