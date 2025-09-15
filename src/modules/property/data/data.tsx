const mockProperties = [
    {
        id: 1,
        name: "Sunset Apartments",
        address: "123 Sunset Boulevard, Westlands, Nairobi",
        type: "Apartment",
        totalUnits: 24,
        occupiedUnits: 22,
        monthlyRevenue: 480000,
        status: "active",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
        owner: {
            name: "John Doe",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        },
        manager: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b898?w=40&h=40&fit=crop&crop=face"
        },
        dateAdded: "2024-01-15",
        maintenanceRequests: 3,
        pendingApplications: 5
    },
    {
        id: 2,
        name: "Green Valley Townhouses",
        address: "456 Valley Road, Karen, Nairobi",
        type: "Townhouse",
        totalUnits: 18,
        occupiedUnits: 16,
        monthlyRevenue: 720000,
        status: "active",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
        owner: {
            name: "Mary Smith",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
        },
        manager: {
            name: "James Wilson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
        },
        dateAdded: "2024-02-20",
        maintenanceRequests: 1,
        pendingApplications: 2
    },
    {
        id: 3,
        name: "City Center Plaza",
        address: "789 Kenyatta Avenue, CBD, Nairobi",
        type: "Commercial",
        totalUnits: 12,
        occupiedUnits: 10,
        monthlyRevenue: 1200000,
        status: "active",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
        owner: {
            name: "Robert Chen",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        },
        manager: {
            name: "Lisa Brown",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b898?w=40&h=40&fit=crop&crop=face"
        },
        dateAdded: "2023-11-10",
        maintenanceRequests: 0,
        pendingApplications: 8
    },
    {
        id: 4,
        name: "Riverside Gardens",
        address: "321 Riverside Drive, Lavington, Nairobi",
        type: "Apartment",
        totalUnits: 36,
        occupiedUnits: 30,
        monthlyRevenue: 900000,
        status: "maintenance",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
        owner: {
            name: "Grace Wanjiku",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
        },
        manager: {
            name: "David Kim",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
        },
        dateAdded: "2023-09-05",
        maintenanceRequests: 7,
        pendingApplications: 1
    },
    {
        id: 5,
        name: "Executive Suites",
        address: "654 Ngong Road, Kilimani, Nairobi",
        type: "Executive",
        totalUnits: 8,
        occupiedUnits: 8,
        monthlyRevenue: 640000,
        status: "active",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop",
        owner: {
            name: "Michael Ochieng",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        },
        manager: {
            name: "Emma Davis",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b898?w=40&h=40&fit=crop&crop=face"
        },
        dateAdded: "2024-03-12",
        maintenanceRequests: 0,
        pendingApplications: 12
    },
    {
        id: 6,
        name: "Student Housing Block A",
        address: "147 University Way, Nairobi",
        type: "Student Housing",
        totalUnits: 60,
        occupiedUnits: 45,
        monthlyRevenue: 450000,
        status: "inactive",
        image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=300&h=200&fit=crop",
        owner: {
            name: "Patricia Mwangi",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
        },
        manager: {
            name: "Thomas Anderson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
        },
        dateAdded: "2023-08-22",
        maintenanceRequests: 2,
        pendingApplications: 0
    }
];

export { mockProperties }