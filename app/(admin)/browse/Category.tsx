"use client";

import { FC, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { TMDBResult } from "@/lib/movies";

const Category: FC<{ title: string; fetchUrl: string }> = ({
    title,
    fetchUrl,
}) => {
    const [movies, setMovies] = useState<TMDBResult[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(fetchUrl);
                console.log(response.data);
                setMovies(response.data.results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMovies();
    }, [fetchUrl]);

    return (
        <section aria-label="category" aria-labelledby="category-title">
            <div className="space-y-1">
                <h2
                    id="category-title"
                    className="text-base sm:text-lg font-semibold text-white pl-6 sm:pl-0"
                >
                    {title}
                </h2>

                <div
                    className="flex gap-2 overflow-x-auto pl-6 sm:pl-0 min-h-52"
                    id="category-scroll"
                >
                    {movies.map((movie) => (
                        <MovieCard
                            poster={movie.poster_path || ""}
                            id={movie.id}
                            key={movie.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
