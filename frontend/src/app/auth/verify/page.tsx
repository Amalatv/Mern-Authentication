"use client";

import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import { API_URL } from "@/server";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";
import { useRouter, useSearchParams } from "next/navigation";

const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please sign up first!");
      router.replace("/auth/signup");
    }
  }, [email, router]);

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      event.key === "Backspace" &&
      !inputRefs.current[index]?.value &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const otpValue = otp.join("");
      const response = await axios.post(
        `${API_URL}/users/verify`,
        { 
          email,
          otp: otpValue,
          setVerified: true // Explicitly tell backend to set isVerified
        },
        { withCredentials: true }
      );

      const user = response.data.data.user;
      
      // Ensure user is marked as verified in Redux
      dispatch(setAuthUser({
        ...user,
        isverified: true
      }));

      toast.success("Email verification successful!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
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
        `${API_URL}/users/resend-otp`,
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
    <div className="min-h-screen mx-auto container p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-md py-8 px-10 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-400">Email Verification</h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter the verification code sent to<br />
          <span className="font-semibold text-blue-600">{email}</span>
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-12 h-12 text-center text-2xl font-bold border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || otp.some((digit) => !digit)}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" /> Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </button>

        <div className="text-center mt-4">
          <button
            onClick={handleResendOtp}
            disabled={loading}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
