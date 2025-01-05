"use client";

import { JSX } from "react";
import NetflixHeader from "@/public/Netflix_Logo_CMYK.png";
import Image from "next/image";
import Link from "next/link";
import NetflixProfile from "@/public/netflix-profile.jpg";
import { useRouter } from "next/navigation";

const Header = (): JSX.Element => {
    const router = useRouter();

    return (
        <header className="px-4 bg-gradient-to-b from-black to-transparent fixed top-0 w-full z-50">
            <div className="max-w-7xl m-auto flex items-center justify-between">
                <Link href="/browse">
                    <Image
                        src={NetflixHeader}
                        alt="header-image"
                        className="w-36"
                    />
                </Link>

                <div className="flex items-center space-x-4">
                    <form action="/movie/search">
                        <input
                            type="text"
                            name="q"
                            placeholder="Search Movies"
                            className="max-w-56 bg-white/50 px-4 py-2 rounded text-sm placeholder:text-white text-white"
                        />
                    </form>

                    <button
                        type="button"
                        role="send-to-profile"
                        onClick={() => router.push("/profile")}
                    >
                        <Image
                            src={NetflixProfile}
                            alt="profile"
                            className="w-8 h-8 rounded-sm"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
