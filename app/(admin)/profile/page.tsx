"use client";

import { JSX, useEffect } from "react";
import SignOut from "./SignOut";
import Subscription from "./Subscription";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";

const Profile = (): JSX.Element => {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!user._id) {
            router.replace("/");
            return;
        }
    }, [user]);
    return (
        <main className="h-screen pt-24">
            <div className="text-white max-w-2xl p-6 m-auto">
                <SignOut />
                <Subscription />
            </div>
        </main>
    );
};

export default Profile;
