"use client";

import React, { useEffect, useState } from "react";
import { getProfile, GetProfileResponse } from "@/services/userService";

const Dashboard = () => {
  const [profile, setProfile] = useState<GetProfileResponse['data']>();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    getProfile().then((profile) => {
      setProfile(profile.data);
      isLoading(false);
    });
  }, []);

  if(loading || !profile) {
    return <div className="text-xl">Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard, {profile.Username}!</h1>
      <h2>Coin: {profile.Coin}</h2>
      {/* Additional dashboard content */}
    </div>
  );
};

export default Dashboard;
