"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import 'styles/profile.css';

const Profile = () => {
  return (
    <ProtectedRoute>
      <div className="profile-content">
        <h1>Profile</h1>
        <p>This is your profile page.</p>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
