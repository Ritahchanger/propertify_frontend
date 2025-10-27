// Types
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

export interface EstateDropdownItem {
  id: string;
  name: string;
}


export interface EstateDropdownOption {
  value: string; // estate id
  label: string; // estate name
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

export interface EstatesResponse {
  success: boolean;
  estates: Estate[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface EstatesState {
  estates: Estate[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Initial state
export const initialState: EstatesState = {
  estates: [],
  loading: false,
  error: null,
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
  hasNext: false,
  hasPrevious: false,
};
