"use client";

import { useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { selectMoviesState } from "@/lib/store/moviesSlice";
import MovieCard from "./movie-card";
import MovieDetailsModal from "./movie-details-modal";
import { MovieGridSkeleton } from "./skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, SearchX } from "lucide-react";

export default function MovieGrid() {
  const { movies, status, error } = useAppSelector(selectMoviesState);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const handleCardClick = (imdbID: string) => {
    setSelectedMovieId(imdbID);
  };

  const handleModalClose = () => {
    setSelectedMovieId(null);
  };

  if (status === "loading") {
    return <MovieGridSkeleton />;
  }

  if (status === "failed") {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Search Failed</AlertTitle>
        <AlertDescription>
          {error || "An unknown error occurred. Please try again later."}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === "succeeded" && movies.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <SearchX className="mx-auto h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold">No Results Found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => handleCardClick(movie.imdbID)}
          />
        ))}
      </div>
      <MovieDetailsModal
        imdbID={selectedMovieId}
        isOpen={!!selectedMovieId}
        onClose={handleModalClose}
      />
    </>
  );
}
