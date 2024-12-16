"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { API_URL } from "@/server";
import { setAuthUser } from "@/store/authSlice";
import { toast } from "react-toastify";


const Nav = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        await axios.post(`${API_URL}/users/logout`);
        dispatch(setAuthUser(null));
        toast.success("Logout Successfull");
    };
    return (
        <header >
            <div className="w-full px-2 md:px-4 py-4 fixed z-10 bg-black flex">
                <div className="flex-1">
                <img className="w-40 md:w-60 h-15" src="https://res.cloudinary.com/dehuas3qw/image/upload/v1734300125/luminotech2_hkfq18.svg" />
                </div>
                <div className="flex items-center gap-7 cursor-pointer">
                    <div>
                        {!user && (
                            <Link href={"/auth/signup"}>
                                <button className="px-3 py-2 rounded-lg bg-slate-300 text-blue-900 hover:bg-slate-50 ">
                                    Register
                                </button>
                            </Link>
                        )}

                        {user && (
                            <div className="flex gap-4">
                                <div className="font-bold uppercase text-xl p-2 text-blue-100 w-10 h-10 border rounded-full flex justify-center items-center">
                                    {user.username.split("")[0]}
                                </div>
                                <button className="hidden sm:block px-3 py-2 rounded-lg bg-slate-300 text-blue-900 hover:bg-slate-200 cursor-pointer">
                                    Dashboard
                                </button>
                                <button
                                    onClick={logoutHandler}
                                    className="px-3 py-2 rounded-lg bg-slate-300 text-blue-900 hover:bg-slate-200 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Nav


