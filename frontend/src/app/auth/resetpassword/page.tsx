"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/server";
import { FiLoader } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const dispatch = useDispatch();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    if (!otp || !email || !password || !passwordConfirm) return;
    setLoading(true);

    try {
      const data = { 
        email, 
        otp, 
        password, 
        passwordConfirm,
        isverified: true  
      };

      const response = await axios.post(
        `${API_URL}/users/reset-password`,
        data,
        {
          withCredentials: true,
        }
      );

      const user = response.data.data.user;
      dispatch(setAuthUser({
        ...user,
        isverified: true  
      }));
      
      toast.success("Password Reset Successful");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/users/forgot-password`,
        { email },
        { withCredentials: true }
      );
      toast.success("New OTP has been sent to your email");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mx-auto min-h-screen flex items-center justify-center container p-4 ">
        <div className="bg-white w-full max-w-md py-5 px-10 mx-auto rounded-xl shadow-2xl">
          <div className="flex flex-col items-center mt-3">
            <h1 className="text-3xl text-slate-800 font-bold pb-3">
              Reset Your Password!
            </h1>
            <div className="text-md text-slate-400 font-semibold pb-4">
              Enter OTP sent to your email
            </div>
          </div>

          <form className="w-full">
            <div className="grid pb-4">
              <label className="text-gray-400">OTP</label>
              <input
                name="otp"
                className="outline-none p-2 pt-2 bg-slate-100 rounded-lg text-black"
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="pb-4">
              <label className="text-gray-400">New Password</label>
              <div className="flex items-center p-2 pt-2 bg-slate-100 rounded-lg">
                <input
                  name="password"
                  className="outline-none w-full bg-slate-100 text-black"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <label className="text-gray-400">Confirm New Password</label>
              <div className="flex items-center p-2 pt-2 bg-slate-100 rounded-lg">
                <input
                  name="passwordConfirm"
                  className="outline-none w-full bg-slate-100 text-black"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
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
              <button
                onClick={handleSubmit}
                className="bg-blue-600 p-2 rounded-lg text-white w-full font-semibold"
              >
                Change Password
              </button>
            )}
            {loading && (
              <button className="bg-blue-600 p-2 rounded-lg text-white w-full font-semibold flex justify-center">
                <FiLoader className="animate-spin" />
              </button>
            )}
          </form>

          <h2 className=" mt-5 font-normal">
            {" "}
            <Link href={"/auth/login"}>
              <span className="text-blue-600 cursor-pointer font-semibold text-right underline block text-sm">
                Go Back
              </span>
            </Link>{" "}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
