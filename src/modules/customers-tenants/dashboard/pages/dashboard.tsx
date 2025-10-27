import { useState } from "react";
import {
  Home,
  CreditCard,
  History,
  FileText,
  Bell,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  LogOut,
  Camera,
  Edit,
  Save,
  X,
} from "lucide-react";
import { logoutUser } from "@/modules/authentication/user/auth-slice/auth.slice";
import tenantData from "../data/type";
import { useSelector, useDispatch } from "react-redux";

import ProfileForm from "../components/ProfileForm";

import type { RootState, AppDispatch } from "@/store/store";

import MakePayment from "../components/MakePayment";

import ShowProfileDropDown from "../components/ShowProfileDropDown";

import PaymentHistoryTab from "../components/PaymentHistoryTab";

const TenantsDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [activeTab, setActiveTab] = useState("my-unit");
  const [paymentAmount, setPaymentAmount] = useState(4500);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: tenantData.phone || "",
  });
  const [profileImage, setProfileImage] = useState("/default-avatar.png");

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePayment = async () => {
    alert(
      `Initiating payment of KSh ${paymentAmount} for ${tenantData.unit.name}`
    );
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Add profile update logic here
    console.log("Saving profile:", profileData);
    setIsEditingProfile(false);
    // Dispatch update profile action here
  };

  const handleCancelEdit = () => {
    setProfileData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: tenantData.phone || "",
    });
    setIsEditingProfile(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {" "}
      {/* Added pt-16 for fixed navbar spacing */}
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-neutral-300 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Propertify
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-300"
                    />
                  </div>
                  <span className="text-sm font-medium">{`${user?.firstName} ${user?.lastName}`}</span>
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <ShowProfileDropDown
                    profileImage={profileImage}
                    user={user}
                    handleProfileImageChange={handleProfileImageChange}
                    setIsEditingProfile={setIsEditingProfile}
                    setShowProfileDropdown={setShowProfileDropdown}
                    handleLogout={handleLogout}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Click outside to close dropdown */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {`${user?.firstName} ${user?.lastName}`}!
          </h1>
          <p className="text-gray-600 mt-2">Here's your rental overview</p>
        </div>

        {/* Profile Editing Section */}
        {isEditingProfile && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-neutral-300 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Profile
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover border-4 border-gray-300"
                  />
                  <label
                    htmlFor="profileImageEdit"
                    className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                  >
                    <Camera className="h-5 w-5 text-white" />
                    <input
                      id="profileImageEdit"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Click the camera icon to update your profile photo
                </p>
              </div>

              {/* Profile Form Section */}
              <ProfileForm
                profileData={profileData}
                setProfileData={setProfileData}
              />
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-300">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Current Unit
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {tenantData.unit.name}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-300">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Monthly Rent
                </p>
                <p className="text-xl font-bold text-gray-900">
                  KSh {tenantData.unit.rent}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-300">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Next Payment Due
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {tenantData.upcomingPayment.dueDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-300 mb-8">
          <div className="border-b border-neutral-300">
            <nav className="flex -mb-px">
              {[
                { id: "my-unit", name: "My Unit", icon: Home },
                { id: "make-payment", name: "Make Payment", icon: CreditCard },
                {
                  id: "payment-history",
                  name: "Payment History",
                  icon: History,
                },
                { id: "documents", name: "Documents", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 border-b-2 border-neutral-300 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* My Unit Tab */}
            {activeTab === "my-unit" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Unit Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Unit Name:</span>
                        <span className="font-medium">
                          {tenantData.unit.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Building:</span>
                        <span className="font-medium">
                          {tenantData.unit.building}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-right">
                          {tenantData.unit.address}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Rent:</span>
                        <span className="font-medium text-green-600">
                          KSh {tenantData.unit.rent}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rent Due Date:</span>
                        <span className="font-medium">
                          {tenantData.unit.dueDate} of each month
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {tenantData.unit.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveTab("make-payment")}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Pay Rent Now
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                        <FileText className="h-5 w-5 mr-2" />
                        View Lease Agreement
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                        <Bell className="h-5 w-5 mr-2" />
                        Report Maintenance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Make Payment Tab */}
            {activeTab === "make-payment" && (
              <MakePayment
                paymentAmount={paymentAmount}
                setPaymentAmount={setPaymentAmount}
                tenantData={tenantData}
                handlePayment={handlePayment}
              />
            )}

            {/* Payment History Tab */}
            {activeTab === "payment-history" && (
              <PaymentHistoryTab
                tenantData={tenantData}
              />
            )}

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Lease Agreement",
                      type: "PDF",
                      date: "2024-01-15",
                    },
                    { name: "House Rules", type: "PDF", date: "2024-01-15" },
                    {
                      name: "Payment Receipt - Jan 2025",
                      type: "PDF",
                      date: "2025-01-01",
                    },
                    {
                      name: "Payment Receipt - Dec 2024",
                      type: "PDF",
                      date: "2024-12-01",
                    },
                    {
                      name: "Maintenance Guidelines",
                      type: "PDF",
                      date: "2024-01-15",
                    },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {doc.type}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {doc.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Uploaded: {doc.date}
                      </p>
                      <button className="w-full mt-3 bg-white border border-neutral-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors duration-200">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantsDashboard;
