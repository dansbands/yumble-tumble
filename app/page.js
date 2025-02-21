"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/api/auth/signin");
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await fetch("/api/profiles");
      const data = await res.json();
      setProfiles(data);
    };
    fetchProfiles();
  }, []);

  const handleSwipe = async (direction) => {
    const profile = profiles[currentIndex];
    if (direction === "like") {
      await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileId: profile._id }),
      });
    } else {
      await fetch("/api/dislike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileId: profile._id }),
      });
    }
    setCurrentIndex(currentIndex + 1);
  };

  if (profiles.length === 0) return <div>Loading...</div>;
  console.log('profiles[currentIndex]', profiles[currentIndex]);
  return (
    <div>
      <h1>Swipe Profiles</h1>
      {profiles[currentIndex] && (
        <div>
          {/* <Image
            src={profiles[currentIndex]?.photos[0]}
            alt="Profile"
            width={200}
            height={200}
          /> */}
          <h2>{profiles[currentIndex].name}</h2>
          <p>{profiles[currentIndex].bio}</p>
          <button onClick={() => handleSwipe("like")}>Like</button>
          <button onClick={() => handleSwipe("dislike")}>Dislike</button>
        </div>
      )}
    </div>
  );
};

export default Home;
