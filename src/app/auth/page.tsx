"use client";
import { checkUsername } from "@/services/userService";
import React, { useState } from "react";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameUnique, setUsernameUnique] = useState(true);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    
    checkUsername({ username: e.target.value }).then((response) => {
      if(response.code === "SU") {
        setUsernameUnique(true);
      }

      setUsernameUnique(false);
    })
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col w-[50%] mx-auto h-screen justify-center items-center text-center">
        <h1 className="text-4xl font-bold mb-4">Sign in</h1>
        <div className="grid gap-4">
          <div>
            <input
              type="text"
              className="bg-slate-200 p-2 rounded"
              placeholder="username"
              value={username}
              onChange={onChangeUsername}
            />
            <div className="text-red-600 mr-auto pl-2 w-1">{usernameUnique ? "Username is not Unique" : ""}</div>
          </div>

          <input
            type="password"
            className="bg-slate-200 p-2 rounded"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign in
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
