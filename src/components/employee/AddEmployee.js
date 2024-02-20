"use client";
import React from "react";
import { useState } from "react";

const AddEmployee = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/addemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Employee Added error:", error);
      }
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Employee Message addition operation error", error);
      alert("error");
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="my-5 bg-white rounded-md shadow-[0px_5px_20px_lightgray] mb-20">
        <h1 className="p-4 text-3xl font-semibold text-cyan-900">
          Add Employee
        </h1>

        <div className="p-2 rounded-md md:p-5 bg-white">
          <h2 className="ml-[420px] text-2xl text-cyan-900 font-semibold uppercase">
            Employee Details
          </h2>

          <div className="ml-[420px] flex flex-col items-center gap-3 py-5 lg:flex-row lg:justify-between lg:items-start">
            <div className="flex flex-col gap-3">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="bg-gray-100 text-sm md:text-base w-[200px] sm:w-[300px] h-[30px] md:h-[40px] p-2 border-none outline-none rounded-md"
              />
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                className="bg-gray-100 text-sm md:text-base w-[200px] sm:w-[300px] h-[30px] md:h-[40px] px-2 py-0 border-none outline-none rounded-md"
              />
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="bg-gray-100 text-sm md:text-base w-[200px] sm:w-[300px] h-[30px] md:h-[40px] p-2 border-none outline-none rounded-md"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 py-5">
            <button
              onClick={handleAddEmployee}
              className="bg-blue-500 text-white  w-40 rounded px-2 py-1 hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
