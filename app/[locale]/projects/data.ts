export type Project = {
  id: string;
  name: string;
  location: string;
  country: string;
  year: number;
  type: string;
  systems: string[];
  openings: number;
  architect: string;
  imgSeed: string;
  featured: boolean;
  tag: string;
};

export const PROJECTS: Project[] = [
  {
    id: "atrium-residence",
    name: "Atrium Residence",
    location: "Vienna, Austria",
    country: "AT",
    year: 2025,
    type: "residential",
    systems: ["AW-72", "CW-60"],
    openings: 214,
    architect: "Eichinger Offices",
    imgSeed: "facade-geo",
    featured: true,
    tag: "High-rise residential",
  },
  {
    id: "block-14-mitte",
    name: "Block 14 — Mitte",
    location: "Berlin, Germany",
    country: "DE",
    year: 2024,
    type: "residential",
    systems: ["PW-88", "RS-45"],
    openings: 98,
    architect: "Kuehn Malvezzi",
    imgSeed: "facade-con",
    featured: false,
    tag: "Mixed-use block",
  },
  {
    id: "hotel-karst",
    name: "Hotel Karst",
    location: "Ljubljana, Slovenia",
    country: "SI",
    year: 2025,
    type: "hospitality",
    systems: ["SW-190", "ED-120"],
    openings: 46,
    architect: "Ofis Arhitekti",
    imgSeed: "arch-a",
    featured: false,
    tag: "Boutique hotel",
  },
  {
    id: "villa-gornji",
    name: "Villa Gornji",
    location: "Dubrovnik, Croatia",
    country: "HR",
    year: 2024,
    type: "residential",
    systems: ["AW-72", "SW-190"],
    openings: 34,
    architect: "3LHD Studio",
    imgSeed: "arch-b",
    featured: false,
    tag: "Private villa",
  },
  {
    id: "campus-brno",
    name: "Campus Brno — Block C",
    location: "Brno, Czech Republic",
    country: "CZ",
    year: 2025,
    type: "commercial",
    systems: ["AW-85", "CW-60"],
    openings: 312,
    architect: "Chybik + Kristof",
    imgSeed: "facade-met",
    featured: true,
    tag: "Office campus",
  },
  {
    id: "soziale-wohnbau",
    name: "Soziale Wohnbau Graz",
    location: "Graz, Austria",
    country: "AT",
    year: 2024,
    type: "residential",
    systems: ["PW-76", "RS-45"],
    openings: 540,
    architect: "Grabner Huber Lipp",
    imgSeed: "facade-brick",
    featured: false,
    tag: "Social housing",
  },
  {
    id: "terme-catez",
    name: "Terme Čatež Extension",
    location: "Čatež ob Savi, Slovenia",
    country: "SI",
    year: 2023,
    type: "hospitality",
    systems: ["PW-92S", "ED-120"],
    openings: 88,
    architect: "Arhitektura Krušec",
    imgSeed: "arch-c",
    featured: false,
    tag: "Spa & resort",
  },
  {
    id: "munich-riem",
    name: "Riem Arcaden Residential",
    location: "Munich, Germany",
    country: "DE",
    year: 2024,
    type: "residential",
    systems: ["AW-72", "RS-45"],
    openings: 176,
    architect: "Meck Architekten",
    imgSeed: "arch-d",
    featured: false,
    tag: "Dense residential",
  },
];

export const TYPES = [
  { k: "all", l: "All" },
  { k: "residential", l: "Residential" },
  { k: "commercial", l: "Commercial" },
  { k: "hospitality", l: "Hospitality" },
];

export const COUNTRIES = [
  { k: "all", l: "All countries" },
  { k: "AT", l: "Austria" },
  { k: "DE", l: "Germany" },
  { k: "SI", l: "Slovenia" },
  { k: "HR", l: "Croatia" },
  { k: "CZ", l: "Czech Rep." },
];
