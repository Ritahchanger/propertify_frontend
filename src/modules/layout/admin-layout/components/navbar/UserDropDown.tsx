import {
  User,
  Settings,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";

const UserDropDown = ({ user, getRoleBadgeColor, handleLogout }: any) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      {/* User Profile Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user.name
                .split(" ")
                .map((n: any) => n[0])
                .join("")}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="flex items-center mt-1 space-x-2">
              <span
                className={`text-xs px-2 py-1 rounded-lg font-medium ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                Property Owner
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium">
                {user.plan} Plan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {user.properties}
            </div>
            <div className="text-xs text-gray-500">Properties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{user.units}</div>
            <div className="text-xs text-gray-500">Total Units</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {user.monthlyRevenue}
            </div>
            <div className="text-xs text-gray-500">Monthly Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">
              {user.occupancyRate}
            </div>
            <div className="text-xs text-gray-500">Occupancy Rate</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
          <User className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
          <div className="text-left">
            <div className="font-medium">Profile Settings</div>
            <div className="text-xs text-gray-500">
              Manage your account details
            </div>
          </div>
        </button>
        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
          <Settings className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
          <div className="text-left">
            <div className="font-medium">Account Settings</div>
            <div className="text-xs text-gray-500">
              Preferences and configurations
            </div>
          </div>
        </button>
        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
          <CreditCard className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
          <div className="text-left">
            <div className="font-medium">Billing & Subscription</div>
            <div className="text-xs text-gray-500">
              Manage your {user.plan} plan
            </div>
          </div>
        </button>
        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
          <Shield className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
          <div className="text-left">
            <div className="font-medium">Security</div>
            <div className="text-xs text-gray-500">
              Password and authentication
            </div>
          </div>
        </button>
        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
          <HelpCircle className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
          <div className="text-left">
            <div className="font-medium">Help & Support</div>
            <div className="text-xs text-gray-500">
              Get assistance and documentation
            </div>
          </div>
        </button>

        <div className="border-t border-gray-100 mt-2 pt-2">
          <button
            className="w-full flex items-center px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-150 group"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
            <div className="text-left">
              <div className="font-medium">Sign Out</div>
              <div className="text-xs text-red-400">
                End your current session
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropDown;
