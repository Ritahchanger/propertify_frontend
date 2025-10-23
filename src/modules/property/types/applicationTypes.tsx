// Application types
export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export interface EstateOwner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Estate {
  id: string;
  name: string;
  location: string;
  owner: EstateOwner;
}

export interface Unit {
  id: string;
  unitNumber: string;
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  estate: Estate;
}

export interface Application {
  id: string;
  applicationId?: string;
  unitId: string;
  applicantId: string;
  preferredMoveInDate: string;
  rentDurationMonths: number;
  applicationStatus: "pending" | "approved" | "rejected" | "withdrawn";
  employmentLetterUrl?: string;
  idCopyUrl?: string;
  kraPin?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  rejectionReason?: string;
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  applicant: Applicant;
  unit: Unit;
}

export interface ApplicationsResponse {
  applications: Application[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  withdrawn: number;
}

export interface UpdateApplicationStatusPayload {
  applicationId: string;
  status: string;
  rejectionReason?: string;
}

export interface ApplicationsState {
  applications: Application[];
  applicationStats: ApplicationStats | null;
  selectedApplication: Application | null;
  loading: boolean;
  error: string | null;
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
