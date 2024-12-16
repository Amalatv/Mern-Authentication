"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/server";
import { FiLoader } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setAuthUser } from "@/store/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //form validation//
  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.passwordConfirm) {
      toast.error("All fields are required");
      return false;
    }
    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email address");
      return false;
    }
    return true;
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/signup`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const user = response.data.data.user;
      
      // Store the user in Redux state
      dispatch(setAuthUser(user));
      
      toast.success("Please check your email for verification.");
      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mx-auto container p-4 ">
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
            <h1 className="text-3xl text-slate-800 font-bold">
              Create Account!
            </h1>
            <div className="text-md text-slate-400 font-semibold pb-4">
              Use your email for registration
            </div>
          </div>

          <form onSubmit={submitHandler} className="w-full">
            <div className="grid pb-4">
              <label className="text-gray-400">Username</label>
              <input
                name="username"
                className="outline-none p-2 pt-2 bg-slate-100 rounded-lg text-black"
                type="username"
                placeholder="enter Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="grid pb-4">
              <label className="text-gray-400">Email</label>
              <input
                name="email"
                className="outline-none p-2 pt-2 bg-slate-100 rounded-lg text-black"
                type="email"
                placeholder="enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="pb-4">
              <label className="text-gray-400">Password</label>
              <div className="flex items-center p-2 pt-2 bg-slate-100 rounded-lg">
                <input
                  name="password"
                  className="outline-none w-full bg-slate-100 text-black"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span className="text-black">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div className="pb-4">
              <label className="text-gray-400">Confirm Password</label>
              <div className="flex items-center p-2 pt-2 bg-slate-100 rounded-lg">
                <input
                  name="passwordConfirm"
                  className="outline-none w-full bg-slate-100 text-black"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confirm password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span className="text-black">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            {!loading && (
              <button className="bg-blue-600 p-2 rounded-lg text-white w-full font-semibold">
                Signup
              </button>
            )}
            {loading && (
              <button className="bg-blue-600 p-2 rounded-lg text-white w-full font-semibold flex justify-center">
                <FiLoader className="animate-spin" />
              </button>
            )}
          </form>

          <h2 className="texy-center mt-5 font-normal">
            {" "}
            <span className="text-black">Already have an account?</span>
            {" "}
            <Link href={"/auth/login"}>
              <span className="text-blue-600 cursor-pointer font-semibold">
                Login
              </span>
            </Link>{" "}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Signup;
