"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

const Profile = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Profile</h1>
        <p>This is your profile page.</p>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
