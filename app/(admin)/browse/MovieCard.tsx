import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface MovieCardProps {
    poster: string;
    id: number;
}

const MovieCard: FC<MovieCardProps> = ({ poster, id }) => {
    return (
        <Link href={`/movie/${id}`}>
            <article className="w-32 bg-slate-200 h-52 rounded relative overflow-hidden bg-white/40">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${poster}`}
                    alt="poster"
                    width={1000}
                    height={1000}
                    className="w-full h-full absolute top-0 left-0 object-cover object-center"
                />
            </article>
        </Link>
    );
};

export default MovieCard;
