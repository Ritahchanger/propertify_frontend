import { Camera, Edit, LogOut } from "lucide-react";

// Define the component props
interface ShowProfileDropDownProps {
  profileImage: string;
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
  handleProfileImageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  setIsEditingProfile: (isEditing: boolean) => void;
  setShowProfileDropdown: (show: boolean) => void;
  handleLogout: () => void;
}

const ShowProfileDropDown: React.FC<ShowProfileDropDownProps> = ({
  profileImage,
  user,
  handleProfileImageChange,
  setIsEditingProfile,
  setShowProfileDropdown,
  handleLogout,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover border-2 border-gray-300"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
            >
              <Camera className="h-3 w-3 text-white" />
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {`${user?.firstName} ${user?.lastName}`}
            </p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="py-1">
        <button
          onClick={() => {
            setIsEditingProfile(true);
            setShowProfileDropdown(false);
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ShowProfileDropDown;
