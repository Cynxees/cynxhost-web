"use client";

import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const usernameCookie = cookies.find((cookie) =>
      cookie.startsWith("username=")
    );

    if (usernameCookie) {
      const username = usernameCookie.split("=")[1];
      setUsername(username);
    }
  }, []);

  return (
    <div>
      <h1>Welcome to your Dashboard, {username ? username : "User"}!</h1>
      {/* Additional dashboard content */}
    </div>
  );
};

export default Dashboard;
