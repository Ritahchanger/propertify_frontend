export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export interface Unit {
  id: string;
  unitNumber: string;
  status: string;
  monthlyRent: string;
  bedrooms: number;
  bathrooms: number;
}

export interface Estate {
  id: string;
  ownerId: string;
  name: string;
  location: string;
  description: string;
  totalUnits: number;
  status: "active" | "maintenance" | "inactive";
  created_at: string;
  updated_at: string;
  owner: Owner;
  units: Unit[];
}

export interface PaginationInfo {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
