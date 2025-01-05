"use client";

import Image from "next/image";
import NetflixProfile from "@/public/netflix-profile.jpg";
import { JSX, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase.config";
import { useRouter } from "next/navigation";

const SignOut = (): JSX.Element => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isPending, session, user } = useAppSelector((state) => state.user);

    const signOutUser = async () => {
        try {
            await signOut(auth);
            router.replace("/");
        } catch (error: unknown) {
            console.error(error);
        }
    };

  

    

    return (
        <div>
            <h1 className="text-2xl font-semibold">Manage Profile</h1>
            <br />
            <div className="flex items-start space-x-5">
                <Image
                    src={NetflixProfile}
                    alt="profile"
                    className="w-14 h-14 rounded-sm"
                />
                <div className="flex-1 space-y-1">
                    <p className="text-sm">{user.email}</p>
                    <p className="text-xs text-gray-200">Active Profile</p>
                </div>
                <button
                    className="bg-[#B20710] text-white px-4 py-2 rounded text-sm active:opacity-95"
                    onClick={signOutUser}
                >
                    SIGN OUT
                </button>
            </div>
        </div>
    );
};

export default SignOut;
