import {
    Building2,
    Users,
    BarChart3,
    Zap,
} from 'lucide-react'

interface Stat {
    label: string;
    value: string;
    trend: string;
}
interface WelcomeFeature {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
}

const features: WelcomeFeature[] = [
    {
        icon: Building2,
        title: "Property Portfolio Management",
        description: "Manage all your properties from a single, intuitive dashboard with real-time insights.",
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Users,
        title: "Tenant & Lease Management",
        description: "Streamline tenant applications, lease renewals, and communication all in one place.",
        color: "from-green-500 to-green-600"
    },
    {
        icon: BarChart3,
        title: "Financial Analytics & Reporting",
        description: "Track income, expenses, and ROI with comprehensive financial reporting tools.",
        color: "from-purple-500 to-purple-600"
    },
    {
        icon: Zap,
        title: "Maintenance Automation",
        description: "Automate work orders, track repairs, and manage vendor relationships effortlessly.",
        color: "from-orange-500 to-orange-600"
    }
];

const stats: Stat[] = [
    { label: "Properties Managed", value: "50,000+", trend: "+12% this quarter" },
    { label: "Happy Property Owners", value: "15,000+", trend: "98% satisfaction" },
    { label: "Monthly Rent Collected", value: "$2.5B+", trend: "+18% YoY growth" }
];

const testimonials: string[] = [
    "Propertify transformed our property management workflow. We've increased efficiency by 300%!",
    "The best investment we made for our rental business. Everything is automated and organized.",
    "Managing 200+ units has never been easier. Propertify handles it all seamlessly."
];


export { stats, features, testimonials }