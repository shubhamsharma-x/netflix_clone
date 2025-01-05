"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import NetflixBanner from "@/public/Netflix-Banner.jpg";
import NetflixHeader from "@/public/Netflix_Logo_CMYK.png";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
    const router = useRouter();
    const { user, session, isPending } = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Block UI until session state is resolved
        if (!isPending) {
            if (user?.subscription?.type !== "none") {
                if (session) {
                    router.replace("/browse");
                    return;
                } else {
                    router.replace("/profile");
                    return;
                }
            }
            setLoading(false); // Stop blocking once resolved
        }
    }, [session, isPending, user?.subscription?.type]);

    const continueWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const data = await signInWithPopup(auth, provider);

            if (!data.user) throw new Error("No user found after logged in.");

            await setDoc(doc(db, "users", data.user.uid), {
                _id: data.user.uid,
                email: data.user.email,
                subscription: { type: "none" },
            });

            router.replace("/profile");
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <p className="text-white text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div role="Wrapper" className="relative overflow-hidden h-screen">
            <Image
                src={NetflixBanner}
                alt="banner"
                className="w-full h-full absolute top-0 left-0 -z-10 object-cover"
            />
            <div className="bg-black/50 h-screen">
                <div className="max-w-5xl m-auto px-4">
                    <header className="py-2">
                        <div className="flex items-center">
                            <Link href="/?netflix">
                                <Image
                                    src={NetflixHeader}
                                    alt="header-image"
                                    className="w-40 sm:w-44"
                                />
                            </Link>
                        </div>
                    </header>
                    <main aria-label="content">
                        <div className="flex items-center justify-center pt-10">
                            <div className="bg-black/80 w-full sm:max-w-md p-10 text-white rounded">
                                <form aria-labelledby="heading-signin">
                                    <div className="space-y-1">
                                        <h2
                                            id="heading-signin"
                                            className="text-2xl sm:text-3xl font-bold"
                                        >
                                            Let's Start
                                        </h2>
                                        <p
                                            id="description-signin"
                                            className="text-sm text-gray-400"
                                        >
                                            Sign in to Netflix account with
                                            Google.
                                        </p>
                                    </div>
                                    <div className="mt-10">
                                        <button
                                            className="flex items-center justify-center space-x-3 w-full bg-[#B20710] active:opacity-95 py-2 rounded"
                                            type="button"
                                            onClick={continueWithGoogle}
                                        >
                                            <FaGoogle className="text-2xl" />
                                            <span className="text-sm sm:text-base">
                                                Continue with Google
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Login;
