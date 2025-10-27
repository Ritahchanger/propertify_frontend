const tenantData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "254113174493",
    unit: {
      id: "672f1c80a2d123001f4c9f55",
      name: "Apartment 4B",
      building: "Skyline Apartments",
      address: "123 Main Street, Nairobi",
      rent: 4500,
      dueDate: "15th",
      status: "active",
    },
    payments: [
      {
        id: "INV-2025-001",
        date: "2025-01-01",
        amount: 4500,
        status: "completed",
        method: "M-Pesa",
        reference: "MP123456789",
      },
      {
        id: "INV-2024-012",
        date: "2024-12-01",
        amount: 4500,
        status: "completed",
        method: "M-Pesa",
        reference: "MP123456788",
      },
      {
        id: "INV-2024-011",
        date: "2024-11-01",
        amount: 4500,
        status: "pending",
        method: "Bank Transfer",
        reference: "BT987654321",
      },
    ],
    upcomingPayment: {
      invoiceId: "INV-2025-002",
      dueDate: "2025-02-15",
      amount: 4500,
      status: "upcoming",
    },
  };
export default tenantData;