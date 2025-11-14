export const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  {
    name: "Services",
    href: "/services",
    current: false,
    dropdown: [
      { name: "Property Management", href: "/services/property-management" },
      { name: "Tenant Screening", href: "/services/tenant-screening" },
      { name: "Maintenance", href: "/services/maintenance" },
      { name: "Financial Reporting", href: "/services/financial-reporting" },
    ],
  },
  { name: "Pricing", href: "/pricing", current: false },
  { name: "Contact", href: "/contact", current: false },
];
