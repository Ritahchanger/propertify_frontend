import React, { useState } from 'react';
import {
    Building2,
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Shield,
    Users,
    BarChart3,
    CheckCircle,
    Zap,
    TrendingUp,
    Home
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface WelcomeFeature {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
}

interface Stat {
    label: string;
    value: string;
    trend: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (): Promise<void> => {
        setIsLoading(true);

        const formData: FormData = { email, password, rememberMe };

        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);
            navigate("/dashboard")
        }, 2000);
    };

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

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Welcome Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white animate-pulse" />
                    <div className="absolute top-60 right-32 w-32 h-32 rounded-full bg-white animate-pulse delay-100" />
                    <div className="absolute bottom-40 left-40 w-48 h-48 rounded-full bg-white animate-pulse delay-200" />
                    <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-white animate-pulse delay-300" />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Header */}
                    <div>
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Building2 className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">Propertify</h1>
                                <p className="text-blue-100">Property Management Platform</p>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-4xl font-bold mb-6 leading-tight">
                                Transform Your Property Management Experience
                            </h2>
                            <p className="text-xl text-blue-100 leading-relaxed max-w-md">
                                Join thousands of successful property managers who've streamlined their operations and maximized their returns with Propertify.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-6 mb-12">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4 group">
                                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-blue-100 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div>
                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold">{stat.value}</div>
                                            <div className="text-blue-200 text-sm">{stat.label}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-300 text-xs font-medium">{stat.trend}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Testimonial Carousel */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <div className="flex items-center space-x-2 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <CheckCircle key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-sm text-blue-100 ml-2">Trusted by thousands</span>
                            </div>
                            <p className="text-blue-50 italic leading-relaxed">
                                "{testimonials[0]}"
                            </p>
                            <div className="text-xs text-blue-200 mt-3">
                                - Sarah Chen, Portfolio Manager at Urban Properties
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <div className="w-full max-w-md">
                    {/* Mobile Logo (visible only on mobile) */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg mb-4">
                            <Building2 className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Propertify</h1>
                    </div>

                    {/* Form Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h2>
                        <p className="text-gray-600 text-center">Sign in to access your property management dashboard</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white rounded-sm shadow-xl p-8 border border-gray-100">
                        <div className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me for 30 days
                                    </label>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !email || !password}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Sign In to Dashboard</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="my-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-3 bg-white text-gray-500 font-medium">
                                            New to Propertify?
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <a
                                        href="#"
                                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                                    >
                                        Start your free 14-day trial
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start">
                            <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-green-800">Enterprise-Grade Security</h3>
                                <p className="text-xs text-green-700 mt-1">
                                    Your data is protected with 256-bit SSL encryption, SOC 2 compliance, and multi-factor authentication.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-gray-500">
                        <span className="flex items-center">
                            <Home className="h-4 w-4 mr-1" />
                            50K+ Properties
                        </span>
                        <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            15K+ Users
                        </span>
                        <span className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            99.9% Uptime
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;