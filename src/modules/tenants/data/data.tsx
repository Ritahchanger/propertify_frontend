import type { Tenant, TenantApplication, Estate } from "../types/type";

// Mock data
const mockTenants: Tenant[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Kamau',
        email: 'john.kamau@email.com',
        phone: '+254712345678',
        idNumber: '12345678',
        status: 'active',
        unitId: 'unit-1',
        unitNumber: 'A-101',
        rentAmount: 45000,
        moveInDate: '2024-01-15',
        leaseEndDate: '2025-01-15',
        emergencyContact: 'Mary Kamau',
        emergencyPhone: '+254798765432',
        role: 'tenant'
    },
    {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Wanjiku',
        email: 'sarah.wanjiku@email.com',
        phone: '+254723456789',
        idNumber: '23456789',
        status: 'active',
        unitId: 'unit-2',
        unitNumber: 'B-205',
        rentAmount: 38000,
        moveInDate: '2023-08-20',
        leaseEndDate: '2024-08-20',
        emergencyContact: 'Peter Wanjiku',
        emergencyPhone: '+254787654321',
        role: 'tenant'
    },
    {
        id: '3',
        firstName: 'David',
        lastName: 'Ochieng',
        email: 'david.ochieng@email.com',
        phone: '+254734567890',
        idNumber: '34567890',
        status: 'suspended',
        unitId: 'unit-3',
        unitNumber: 'C-301',
        rentAmount: 52000,
        moveInDate: '2023-11-10',
        leaseEndDate: '2024-11-10',
        emergencyContact: 'Grace Ochieng',
        emergencyPhone: '+254776543210',
        role: 'tenant'
    }
];

const mockApplications: TenantApplication[] = [
    {
        id: '1',
        unitId: 'unit-4',
        unitNumber: 'A-102',
        applicantId: 'app-1',
        applicantName: 'Alice Njeri',
        email: 'alice.njeri@email.com',
        phone: '+254745678901',
        preferredMoveInDate: '2024-02-01',
        rentDurationMonths: 12,
        applicationStatus: 'pending',
        appliedAt: '2024-01-10T10:30:00Z',
        employmentLetterUrl: 'https://example.com/employment-letter.pdf',
        idCopyUrl: 'https://example.com/id-copy.pdf',
        kraPin: 'A123456789K',
        emergencyContactName: 'James Njeri',
        emergencyContactPhone: '+254765432109'
    },
    {
        id: '2',
        unitId: 'unit-5',
        unitNumber: 'B-203',
        applicantId: 'app-2',
        applicantName: 'Michael Kiprotich',
        email: 'michael.kiprotich@email.com',
        phone: '+254756789012',
        preferredMoveInDate: '2024-01-25',
        rentDurationMonths: 6,
        applicationStatus: 'pending',
        appliedAt: '2024-01-08T14:20:00Z',
        employmentLetterUrl: 'https://example.com/employment-letter2.pdf',
        idCopyUrl: 'https://example.com/id-copy2.pdf',
        kraPin: 'A987654321K',
        emergencyContactName: 'Susan Kiprotich',
        emergencyContactPhone: '+254754321098'
    }
];

const mockEstates: Estate[] = [
    { id: '1', name: 'Green Valley Apartments' },
    { id: '2', name: 'Sunset Heights' },
    { id: '3', name: 'Riverfront Residences' }
];

// API service functions
export const getTenants = async (): Promise<Tenant[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockTenants), 500);
    });
};

export const getTenantApplications = async (): Promise<TenantApplication[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockApplications), 500);
    });
};

export const updateTenantStatus = async (
    tenantId: string,
    status: 'active' | 'inactive' | 'suspended'
): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Update mock data (in a real app, this would be an API call)
            const tenantIndex = mockTenants.findIndex(t => t.id === tenantId);
            if (tenantIndex !== -1) {
                mockTenants[tenantIndex].status = status;
            }
            resolve();
        }, 300);
    });
};

export const updateApplicationStatus = async (
    applicationId: string,
    status: 'approved' | 'rejected',
    reason?: string
): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Update mock data
            const appIndex = mockApplications.findIndex(a => a.id === applicationId);
            if (appIndex !== -1) {
                mockApplications[appIndex].applicationStatus = status;
                if (reason) {
                    mockApplications[appIndex].rejectionReason = reason;
                }
            }
            resolve();
        }, 300);
    });
};

export const getEstates = async (): Promise<Estate[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockEstates), 300);
    });
};