"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { API_URL } from "@/server";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/login`, formData, {
        withCredentials: true,
      });

      const user = response.data.data.user;
      
      // Check if user is verified based on the isVerified field from database
      if (user.isVerified === false) {
        toast.error("Please verify your email before logging in");
        router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
        return;
      }

      // User is verified, proceed with login
      dispatch(setAuthUser({
        ...user,
        isverified: true 
      }));
      
      toast.success("Login successful");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="min-h-screen mx-auto container p-4 flex items-center justify-center">
        <div className="bg-white w-full max-w-md py-5 px-10 mx-auto rounded-xl shadow-2xl">
          <div className="text-4xl w-20 h-20 mx-auto flex items-center justify-center p-5 rounded-full bg-slate-100 text-blue-600">
            <Image
              src="https://res.cloudinary.com/dehuas3qw/image/upload/v1734303261/default-removebg-preview_qeikp1.png"
              alt="Default Image"
              width={200}
              height={200}
            />
          </div>

          <div className="flex flex-col items-center mt-3">
            <h1 className="text-3xl text-slate-800 font-bold mb-3">
              Welcome Back!
            </h1>
            <div className="text-md text-slate-400 font-semibold pb-4">
              Use your email and password to login
            </div>
          </div>

          <form onSubmit={submitHandler} className="w-full">
            <div className="grid pb-4">
              <label className="text-gray-400">Email</label>
              <input
                name="email"
                className="outline-none p-2 pt-2 bg-slate-100 rounded-lg text-black"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pb-1">
              <label className="text-gray-400">Password</label>
              <div className="flex items-center p-2 pt-2 bg-slate-100 rounded-lg ">
                <input
                  name="password"
                  className="outline-none w-full bg-slate-100 text-black"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div
                  className="text-xl cursor-pointer text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className="text-right text-sm text-blue-600 font-semibold">
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-2 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" /> Processing...
                </>
              ) : (
                "Login"
              )}
            </button>

            <div className="text-center mt-4 text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 font-semibold">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
