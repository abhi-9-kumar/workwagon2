import { useContext, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle ,Badge} from "../ui/Card" 
import { 
  User,
  Mail, 
  Phone, 
  Briefcase,
  CheckCircle, 
  XCircle,
  Upload,
  Camera
} from 'lucide-react';

import { Context } from "../../main";
import { magicRequest } from '../../axiosconfig';

const Profile = () => {
  // Sample user data - replace with your actual user data
  const sampleUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Software Developer",
    profileImage: null,
    idCardImage: null,
    isVerified: true,
  };

  const { user  }  = useContext(Context)
  console.log(user);

  const userData = user || sampleUser;
  const [profilePreview, setProfilePreview] = useState(userData.profilePicture?.url);
  const [idCardPreview, setIdCardPreview] = useState(userData.idCardImage?.url);
  const [profileImageFile, setProfileImageFile] = useState(null); 
  const [idCardFile, setIdCardFile] = useState(null); 

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfilePreview(reader.result);
          setProfileImageFile(file);
        } else if (type === 'idCard') {
          setIdCardPreview(reader.result);
          setIdCardFile(file); 
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!profileImageFile && !idCardFile) {
      alert("No images to upload.");
      return;
    }

    const formData = new FormData();
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }
    if (idCardFile) {
      formData.append('idCardImage', idCardFile);
    }

    try {
      const response = await magicRequest.patch('/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Images uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const ProfileImageUpload = ({ image, onUpload }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="relative group w-40 h-40">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-100">
          {image ? (
            <img
              src={image}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <User size={40} className="text-gray-400" />
            </div>
          )}
        </div>
        <label className="absolute inset-0 rounded-full cursor-pointer group-hover:bg-black group-hover:bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white p-2 rounded-full">
            <Camera size={20} className="text-gray-700" />
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => onUpload(e, 'profile')}
          />
        </label>
      </div>
      <span className="text-sm text-gray-500">Click to upload profile picture</span>
    </div>
  );

  const IDCardUpload = ({ image, onUpload }) => (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-medium mb-4">ID Card Upload</h3>
      <div className="relative group w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
        {image ? (
          <div className="relative w-full h-full">
            <img
              src={image}
              alt="ID Card"
              className="w-full h-full object-contain bg-gray-50"
            />
            <label className="absolute inset-0 cursor-pointer group-hover:bg-black group-hover:bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white p-2 rounded-full">
                <Camera size={20} className="text-gray-700" />
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => onUpload(e, 'idCard')}
              />
            </label>
          </div>
        ) : (
          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-blue-500">
            <Upload size={24} />
            <span className="text-sm mt-2">Upload ID Card</span>
            <span className="text-xs text-gray-400 mt-1">Click or drag and drop your ID card image</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => onUpload(e, 'idCard')}
            />
          </label>
        )}
      </div>
    </div>
  );

  const DetailsRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0">
      <div className="flex items-center gap-3 w-48">
        <Icon className="text-gray-500" size={20} />
        <span className="font-medium text-gray-600">{label}:</span>
      </div>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
            <Badge 
              variant={userData.isVerified ? "success" : "secondary"}
              className={`${
                userData.isVerified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              } flex items-center gap-1`}
            >
              {userData.isVerified ? (
                <>
                  <CheckCircle size={16} />
                  Verified
                </>
              ) : (
                <>
                  <XCircle size={16} />
                  Unverified
                </>
              )}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="flex flex-col items-center">
            {/* Profile Picture Section */}
            <ProfileImageUpload 
              image={user?.profilePicture?.url ? user?.profilePicture?.url:   profilePreview}
              onUpload={handleImageUpload}
            />

            {/* Details Section */}
            <div className="w-full mt-8">
              <div className="bg-white rounded-lg">
                <DetailsRow
                  icon={User}
                  label="Full Name"
                  value={userData.name}
                />
                <DetailsRow
                  icon={Mail}
                  label="Email"
                  value={userData.email}
                />
                <DetailsRow
                  icon={Phone}
                  label="Phone"
                  value={userData.phone}
                />
                <DetailsRow
                  icon={Briefcase}
                  label="Role"
                  value={userData.role}
                />
              </div>

              {/* ID Card Upload Section */}
              <IDCardUpload 
                image={ user?.document?.url ? user?.document?.url :  idCardPreview}
                onUpload={handleImageUpload}
              />

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;