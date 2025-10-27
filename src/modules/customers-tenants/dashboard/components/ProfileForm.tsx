import { Mail, Phone } from "lucide-react";

// Define the interface for profile data
interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Define the props interface
interface ProfileFormProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profileData,
  setProfileData,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                firstName: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                lastName: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-gray-400 mr-2" />
            Email Address
          </div>
        </label>
        <input
          type="email"
          value={profileData.email}
          onChange={(e) =>
            setProfileData({ ...profileData, email: e.target.value })
          }
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-gray-400 mr-2" />
            Phone Number
          </div>
        </label>
        <input
          type="tel"
          value={profileData.phone}
          onChange={(e) =>
            setProfileData({ ...profileData, phone: e.target.value })
          }
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="254 XXX XXX XXX"
        />
      </div>
    </div>
  );
};

export default ProfileForm;
