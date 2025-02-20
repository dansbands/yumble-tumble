"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/api/auth/signin");
    } else {
      fetchUser();
    }
  }, [session, status, router]);

  const fetchUser = async () => {
    const res = await fetch(`/api/user/${session.user.email}`);
    const data = await res.json();
    console.log("data", data);
    setUser(data);
    setName(data.name);
    setBio(data.bio);
    setEmail(data.email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/user/${session.user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, bio }),
    });
    if (res.ok) {
      await fetchUser();
      alert("Profile updated successfully.");
    } else {
      alert("Failed to update profile.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
