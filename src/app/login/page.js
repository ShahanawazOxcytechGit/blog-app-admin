"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        throw new Error("Wrong Credentials...");
      }

      router.replace("/");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100 rounded"
      style={{
        overflowY: "scroll",
        scrollbarColor: "white white",
        scrollbarWidth: "thin",
        height: "100vh",
      }}>
      <form className="bg-white p-8 shadow-md w-96 rounded" onSubmit={handleLogin} style={{ width: 500 }}>
        <br />
        <h4 className="text-2xl mb-4">
          <b>Sign in to account</b>
        </h4>
        <p style={{ fontFamily: "sans-serif", color: "gray" }}>Enter your email & password to login</p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full p-2"
            placeholder="Test@gmail.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full p-2"
            placeholder="******"
          />
        </div>
        <button type="submit" className="bg-gray-900 text-white rounded py-2 px-4 hover:bg-blue-600" style={{ width: 435 }}>
          Sign in
        </button>

        <div className="mt-2">
          Dont have an account?
          <Link href="/sign-up" className="font-bold text-blue-700 ml-2 hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
