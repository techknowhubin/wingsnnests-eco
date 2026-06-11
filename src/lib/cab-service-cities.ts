// Outstation cab service coverage. Used by CabFareSection and CabFareCard
// to power the "We serve" city chips and outstation pricing routes.

export interface CabServiceCity {
  name: string;
  state: string;
  /** Approximate distance from the closest hub (km) — used for fare estimates */
  kmFromHub?: number;
}

export const cabServiceCities: CabServiceCity[] = [
  // Telangana
  { name: "Hyderabad", state: "Telangana" },
  { name: "Warangal", state: "Telangana", kmFromHub: 145 },
  { name: "Khammam", state: "Telangana", kmFromHub: 195 },
  { name: "Nizamabad", state: "Telangana", kmFromHub: 175 },
  { name: "Karimnagar", state: "Telangana", kmFromHub: 160 },
  { name: "Mahabubnagar", state: "Telangana", kmFromHub: 100 },
  { name: "Siddipet", state: "Telangana", kmFromHub: 115 },
  { name: "Nalgonda", state: "Telangana", kmFromHub: 105 },
  { name: "Adilabad", state: "Telangana", kmFromHub: 305 },
  // Andhra Pradesh
  { name: "Visakhapatnam", state: "Andhra Pradesh" },
  { name: "Vijayawada", state: "Andhra Pradesh", kmFromHub: 275 },
  { name: "Guntur", state: "Andhra Pradesh", kmFromHub: 280 },
  { name: "Nellore", state: "Andhra Pradesh", kmFromHub: 450 },
  { name: "Kadapa", state: "Andhra Pradesh", kmFromHub: 410 },
  { name: "Rajahmundry", state: "Andhra Pradesh", kmFromHub: 470 },
  { name: "Kurnool", state: "Andhra Pradesh", kmFromHub: 215 },
  { name: "Tirupati", state: "Andhra Pradesh", kmFromHub: 565 },
  // Karnataka
  { name: "Bengaluru", state: "Karnataka" },
  { name: "Hubli", state: "Karnataka", kmFromHub: 415 },
  { name: "Gulbarga", state: "Karnataka", kmFromHub: 215 },
  { name: "Davanagere", state: "Karnataka", kmFromHub: 265 },
  { name: "Bidar", state: "Karnataka", kmFromHub: 145 },
  { name: "Mysore", state: "Karnataka", kmFromHub: 145 },
  { name: "Mangalore", state: "Karnataka", kmFromHub: 350 },
];

export const cabServiceCitiesByState = cabServiceCities.reduce<Record<string, CabServiceCity[]>>(
  (acc, c) => {
    (acc[c.state] ||= []).push(c);
    return acc;
  },
  {}
);
