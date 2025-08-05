"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchMovies, selectMoviesState } from "@/lib/store/moviesSlice";
import MovieSearchForm from "@/components/movie-search-form";
import { Film } from "lucide-react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { searchParams, status } = useAppSelector(selectMoviesState);

  useEffect(() => {
    // Only fetch if the status is idle to avoid refetching on every render
    if (status === "idle") {
      dispatch(fetchMovies(searchParams));
    }
  }, [dispatch, searchParams, status]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-accent font-headline flex items-center justify-center gap-3">
          <Film className="w-10 h-10 md:w-12 md:h-12" /> CineScope
        </h1>
        <p className="text-muted-foreground mt-2 text-md md:text-lg">
          Your gateway to the world of cinema.
        </p>
      </header>
      <main className="space-y-8">
        <MovieSearchForm />
      </main>
    </div>
  );
}
