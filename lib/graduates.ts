/**
 * Real Sigmaschool graduates — sourced from the sigmaschool-web repo
 * (public/graduates/graduates.json). These are actual career switchers,
 * used as honest social proof on the result page.
 */
export interface Graduate {
  name: string;
  before: string;
  role: string;
  company: string;
}

export const GRADUATES: Graduate[] = [
  {
    name: "Amir Arif",
    before: "Medical Doctor",
    role: "Presale Architect",
    company: "Axrail",
  },
  {
    name: "Izzat Muzhaffar",
    before: "Building Manager",
    role: "Frontend Developer",
    company: "Softinn Solutions",
  },
  {
    name: "Wan Ahmad Ikhwan",
    before: "Coach",
    role: "Software Developer",
    company: "MoneyMatch",
  },
  {
    name: "Wayne Clifford",
    before: "Student",
    role: "Software Engineer, Test Automation",
    company: "Grab",
  },
  {
    name: "Reagan Kan",
    before: "Production Assistant",
    role: "Software Developer",
    company: "H&Y Hyperlink Technology",
  },
  {
    name: "Mohammad Naqiuddin",
    before: "Senior M&E Project Engineer",
    role: "Software Developer",
    company: "Silentmode",
  },
  {
    name: "Aim",
    before: "Airbnb Homestay Host",
    role: "Frontend Engineer",
    company: "Hiseven",
  },
  {
    name: "Yee Qiang",
    before: "Student",
    role: "Mobile Application Developer",
    company: "Siemens",
  },
  {
    name: "Avinnash Varma",
    before: "Mechanical Engineer",
    role: "Product Specialist",
    company: "Sky Medic Group",
  },
  {
    name: "Tjun",
    before: "Operations Consultant",
    role: "Frontend Developer",
    company: "CMG Group",
  },
];
