import {
  Building2,
  Users,
  DollarSign,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";
export const features = [
  {
    icon: Building2,
    title: "Property Portfolio Management",
    description:
      "Centralized dashboard to manage all your properties, tenants, and financial data in one place.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Tenant & Lease Management",
    description:
      "Streamline tenant screening, lease agreements, and communication with automated workflows.",
    color: "green",
  },
  {
    icon: DollarSign,
    title: "Automated Rent Collection",
    description:
      "Secure online payments with automatic reminders and late fee calculations.",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "Maintenance Tracking",
    description:
      "Efficient maintenance request handling with vendor management and cost tracking.",
    color: "orange",
  },
  {
    icon: BarChart3,
    title: "Financial Reporting",
    description:
      "Comprehensive financial insights with customizable reports and tax documentation.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description:
      "Bank-level security and compliance with real estate regulations and data protection laws.",
    color: "red",
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Property Owner, 25+ units",
    content:
      "EstatePro transformed how I manage my properties. Rent collection is now automated, and maintenance requests are handled seamlessly. My occupancy rate increased by 15%!",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
  {
    name: "Michael Chen",
    role: "Real Estate Investor",
    content:
      "The financial reporting alone is worth it. I can now track ROI across all my properties and make data-driven decisions. The platform paid for itself in the first month.",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
  {
    name: "Emily Rodriguez",
    role: "Property Manager",
    content:
      "My team's efficiency has doubled. The automated workflows and tenant portal have reduced our administrative work by 60%. Highly recommended!",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "49",
    period: "month",
    description: "Perfect for individual property owners",
    features: [
      "Up to 5 properties",
      "Basic tenant management",
      "Online rent collection",
      "Maintenance tracking",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "99",
    period: "month",
    description: "Ideal for growing portfolios",
    features: [
      "Up to 20 properties",
      "Advanced analytics",
      "Automated workflows",
      "Vendor management",
      "Priority support",
      "Custom reporting",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "199",
    period: "month",
    description: "For large-scale operations",
    features: [
      "Unlimited properties",
      "Dedicated account manager",
      "API access",
      "White-label solutions",
      "24/7 phone support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const stats = [
  { number: "2,500+", label: "Properties Managed" },
  { number: "$1.2B", label: "Annual Rent Processed" },
  { number: "98%", label: "Customer Satisfaction" },
  { number: "24/7", label: "Support Available" },
];
