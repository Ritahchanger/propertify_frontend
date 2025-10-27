// Types
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  userStatus: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  idNumber: string;
  role: string;
  status: "active" | "inactive" | "suspended";
}

export interface Estate {
  id: string;
  name: string;
}

export interface Unit {
  id: string;
  unitNumber: string;
  estateId: string;
}

export interface ApplicationDetails {
  preferredMoveInDate: string;
  rentDurationMonths: number;
  applicationStatus: string;
  employmentLetterUrl: string;
  idCopyUrl: string;
  kraPin: string;
  appliedAt: string;
  reviewedAt: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface UnitDetails {
  unitId: string;
  unitNumber: string;
  monthlyRent: string;
  bedrooms: number;
  bathrooms: number;
  unitStatus: string;
}

export interface EstateDetails {
  estateId: string;
  estateName: string;
  location: string;
  description: string;
  totalUnits: number;
  estateStatus: string;
}

export interface OwnerDetails {
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
}

export interface Tenant {
  tenantId: string;
  applicationId: string;
  personalInfo: PersonalInfo;
  applicationDetails: ApplicationDetails;
  emergencyContact: EmergencyContact;
  unitDetails: UnitDetails;
  estateDetails: EstateDetails;
  ownerDetails: OwnerDetails;
}

export interface TenantsResponse {
  tenants: Tenant[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: TenantsResponse;
}

export interface TenantsState {
  tenants: Tenant[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialState: TenantsState = {
  tenants: [],
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
  hasNext: false,
  hasPrevious: false,
  loading: false,
  error: null,
};

export type ActionType = "approve" | "reject" | "suspend" | "activate" | null;
