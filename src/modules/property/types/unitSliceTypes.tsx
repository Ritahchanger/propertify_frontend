export interface Estate {
  id: string;
  name: string;
  location: string;
  status: string;
  totalUnits: number;
}

export interface Unit {
  id: string;
  unitNumber: string;
  status: string;
  monthlyRent: string;
  bedrooms: number;
  bathrooms: number;
  depositAmount: string;
  unitType: string;
  floorArea: string;
  description: string;
  estateId: string;
  created_at: string;
  updated_at: string;
  estate: Estate;
}

export interface CreateUnitData {
  estateId: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  monthlyRent: string;
  depositAmount: string;
  unitType: string;
  floorArea: string;
  status: string;
  description: string;
}

export interface CreateUnitResponse {
  success: boolean;
  message: string;
  data: Unit;
}

export interface VacantUnitsResponse {
  success: boolean;
  message: string;
  data: Unit[];
}

export interface UnitsState {
  loading: boolean;
  error: string | null;
  success: boolean;
  createdUnit: Unit | null;
  vacantUnits: Unit[];
  vacantUnitsLoading: boolean;
  vacantUnitsError: string | null;
}
