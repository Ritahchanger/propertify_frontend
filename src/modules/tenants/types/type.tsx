export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    idNumber: string;
    role: string;
    status: 'active' | 'inactive' | 'suspended';
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

export interface Tenant extends User {
    unitId: string;
    unitNumber: string;
    rentAmount: number;
    moveInDate: string;
    leaseEndDate: string;
    emergencyContact: string;
    emergencyPhone: string;
}

export interface TenantApplication {
    id: string;
    unitId: string;
    unitNumber: string;
    applicantId: string;
    applicantName: string;
    email: string;
    phone: string;
    preferredMoveInDate: string;
    rentDurationMonths: number;
    applicationStatus: 'pending' | 'approved' | 'rejected' | 'withdrawn';
    appliedAt: string;
    employmentLetterUrl?: string;
    idCopyUrl?: string;
    kraPin: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    rejectionReason?: string;
    }