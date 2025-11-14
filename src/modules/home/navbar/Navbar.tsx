import React, { useState } from "react";
import {
  Building2,
  Menu,
  X,
  ChevronDown,
  Search,
  Phone,
  MessageCircle,
} from "lucide-react";

import { navigation } from "./data";
import { Link } from "react-router-dom";

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navbar = ({ activeSection, onSectionChange }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleNavigationClick = (href: string) => {
    const section = href.replace("#", "");
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  const handleServicesClick = (href: string) => {
    const section = href.replace("#", "");
    onSectionChange(section);
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+254 (131) 74-493</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <MessageCircle className="h-3 w-3" />
                <span>support@estatepro.com</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="hidden md:inline">🎉 </span>
              Start managing your properties today -{" "}
              <span className="font-semibold">Free 30-day trial</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => handleNavigationClick("#home")}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    EstatePro
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">
                    Property Management
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group">
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                      </button>

                      {/* Services Dropdown */}
                      {isServicesOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-4 z-50">
                          {item.dropdown.map((service) => (
                            <button
                              key={service.name}
                              onClick={() => handleServicesClick(service.href)}
                              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group text-left"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{service.name}</p>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                                →
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigationClick(item.href)}
                      className={`${
                        activeSection === item.href.replace("#", "")
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700 hover:text-blue-600"
                      } font-medium transition-colors duration-200 relative group`}
                    >
                      {item.name}
                      {activeSection === item.href.replace("#", "") && (
                        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 bg-gray-50 transition-all duration-200"
                />
              </div>
              <Link
                to="/auth/user/login"
                className="px-6 py-2.5 text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
              >
                Admin Login
              </Link>
              <Link
                to="/owner/register"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-4">
              {/* Mobile Search */}
              <div className="pb-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full bg-gray-50"
                  />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isServicesOpen && (
                        <div className="ml-4 space-y-2 mt-2">
                          {item.dropdown.map((service) => (
                            <button
                              key={service.name}
                              onClick={() => handleServicesClick(service.href)}
                              className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                              {service.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigationClick(item.href)}
                      className={`${
                        activeSection === item.href.replace("#", "")
                          ? "text-blue-600 font-semibold bg-blue-50"
                          : "text-gray-700 hover:text-blue-600"
                      } block w-full text-left py-3 px-2 rounded-xl transition-colors duration-200 font-medium`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <a
                  href="/auth/user/login"
                  className="block w-full text-center py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Admin Login
                </a>
                <a
                  href="/owner/register"
                  className="block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg"
                >
                  Get Started Free
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
