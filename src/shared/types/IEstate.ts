export interface IEstate {
  id: string;
  ownerId: string;
  name: string;
  location: string;
  description: string;
  totalUnits: number;
  status: "active" | "maintenance" | "inactive";
  created_at: string;
  updated_at: string;
}
