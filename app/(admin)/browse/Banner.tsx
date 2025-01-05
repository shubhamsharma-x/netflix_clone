"use client";

import { TMDBResult } from "@/lib/movies";
import request from "@/lib/TMDB_request";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";

const Banner = () => {
    const [movie, setMovie] = useState<TMDBResult>();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(request.NetflixOriginals);
                console.log(response.data);
                setMovie(
                    response.data.results[
                        Math.floor(
                            Math.random() * response.data.results.length - 1
                        )
                    ]
                );
            } catch (error) {}
        };
        fetchMovie();
    }, []);


    return (
        <section className="h-[448px] sm:h-[500px] md:h-[550px] relative">
            <div className="w-full h-full absolute top-0 -z-10">
                <img
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    alt="banner-image"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="h-full flex items-end relative">
                <div className="px-6 sm:px-12 mb-16 sm:mb-24 max-w-xl space-y-4 sm:space-y-6 z-10">
                    <h1 className="text-5xl sm:text-6xl text-white font-bold">
                        {movie?.title || movie?.name}
                    </h1>
                    <div className="flex items-center space-x-6">
                        <button
                            role="play"
                            type="button"
                            className="bg-white text-gray-900 px-4 py-2 rounded flex items-center space-x-3"
                        >
                            <FaPlay className="text-xl" />
                            <span className="font-semibold">Play</span>
                        </button>
                        <button
                            role="Moreinfo"
                            type="button"
                            className="bg-white/20 text-white px-4 py-2 rounded flex items-center space-x-3"
                        >
                            <CiCircleInfo className="text-xl" />
                            <span className="font-normal">More Info</span>
                        </button>
                    </div>
                    <p className="text-white line-clamp-2">{movie?.overview}</p>
                </div>

                <div
                    role="bottom-gradient-color"
                    className=" bg-gradient-to-t from-black to-transparent h-[80%] w-full absolute bottom-0 left-0"
                />
            </div>
        </section>
    );
};

export default Banner;
