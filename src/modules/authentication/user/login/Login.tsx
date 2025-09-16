import React, { useState, useEffect } from 'react';
import {
    Building2,
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Shield,
    Users,
    TrendingUp,
    Home
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import Welcome from './Welcome';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { loginUser } from '../auth-slice/auth.slice';

interface FormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setFormError(null);

        if (!email || !password) {
            setFormError("Please fill in all fields");
            return;
        }

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            // The useEffect hook will handle navigation when isAuthenticated becomes true
        } catch (err: any) {
            setFormError(err || "Login failed");
        }
    };

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
                <Welcome />
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

                    {/* Error Message */}
                    {(error || formError) && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                            {error || formError}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-sm shadow-xl p-8 border border-gray-100">
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
                                type="submit"
                                disabled={loading || !email || !password}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {loading ? (
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
                    </form>

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