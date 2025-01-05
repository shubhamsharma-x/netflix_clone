"use client";

import Banner from "@/app/(admin)/browse/Banner";
import Category from "@/app/(admin)/browse/Category";
import { db } from "@/lib/firebase/firebase.config";
import { useAppSelector } from "@/lib/redux/hooks";
import request from "@/lib/TMDB_request";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { JSX, useEffect } from "react";

// Netflix
const App = (): JSX.Element => {
    const subscription = useSearchParams().get("subscription");
    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!user._id) return;

        const addSubscription = async () => {
            try {
                if (!subscription) return;
                const updatedDocRef = await updateDoc(
                    doc(db, "users", user._id),
                    { subscription: { type: subscription } }
                );
            } catch (error) {
                console.error(error);
            }
        };

        addSubscription();
    }, [user._id]);

    return (
        <main aria-label="content">
            <Banner />
            <div className="bg-black">
                <div className="max-w-7xl m-auto space-y-6 pb-20">
                    <Category
                        title="Netflix Originals"
                        fetchUrl={request.NetflixOriginals}
                    />
                    <Category title="Trending" fetchUrl={request.Trending} />
                    <Category
                        title="Now Playing"
                        fetchUrl={request.NowPlayingMovies}
                    />

                    <Category
                        title="Popular TV Shows"
                        fetchUrl={request.PopularTVShows}
                    />
                    <Category
                        title="Top Rated Movies"
                        fetchUrl={request.TopRated}
                    />
                    <Category
                        title="Upcomming Movies"
                        fetchUrl={request.UpcomingMovies}
                    />
                    <Category
                        title="Popular Movies"
                        fetchUrl={request.PopularMovies}
                    />
                </div>
            </div>
        </main>
    );
};

export default App;
