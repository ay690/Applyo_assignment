"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MovieDetailsSkeleton } from "./skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Star, Clapperboard, Calendar, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchMovieDetails,
  selectMoviesState,
  clearMovieDetails,
} from "@/lib/store/moviesSlice";

interface MovieDetailsModalProps {
  imdbID: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovieDetailsModal({
  imdbID,
  isOpen,
  onClose,
}: MovieDetailsModalProps) {
  const dispatch = useAppDispatch();
  const { movieDetails, detailsStatus, detailsError } =
    useAppSelector(selectMoviesState);

  useEffect(() => {
    if (isOpen && imdbID) dispatch(fetchMovieDetails(imdbID));
    return () => {
      if (isOpen) dispatch(clearMovieDetails());
    };
  }, [isOpen, imdbID, dispatch]);

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const posterUrl =
    movieDetails?.Poster !== "N/A"
      ? movieDetails?.Poster
      : "https://placehold.co/400x600";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="
          w-[95vw] sm:w-[90vw] md:w-full
          max-w-[95vw] sm:max-w-4xl md:max-w-5xl
          max-h-[85vh]
          overflow-y-auto
          p-4
        "
      >
        {detailsStatus === "loading" && <MovieDetailsSkeleton />}

        {detailsStatus === "failed" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {detailsError || "Could not load movie details."}
            </AlertDescription>
          </Alert>
        )}

        {detailsStatus === "succeeded" && movieDetails && (
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Poster - full width on small screens */}
            <div className="flex-shrink-0 w-full md:w-[300px] relative aspect-[2/3] rounded-lg overflow-hidden">
              <Image
                src={posterUrl!}
                unoptimized
                alt={`Poster for ${movieDetails.Title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 95vw, 300px"
              />
            </div>

            {/* Details - below image on small, beside on desktop */}
            <div className="flex-1 flex flex-col space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl sm:text-3xl font-bold text-accent">
                  {movieDetails.Title}
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-muted-foreground">
                  {movieDetails.Year} · {movieDetails.Rated} ·{" "}
                  {movieDetails.Runtime}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-2">
                {movieDetails.Genre.split(", ").map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="text-sm sm:text-lg">{movieDetails.Plot}</p>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <strong>Actors:</strong>{" "}
                  <span className="text-muted-foreground">
                    {movieDetails.Actors}
                  </span>
                </div>
                <div>
                  <strong>Director:</strong>{" "}
                  <span className="text-muted-foreground">
                    {movieDetails.Director}
                  </span>
                </div>
                <div>
                  <strong>Writer:</strong>{" "}
                  <span className="text-muted-foreground">
                    {movieDetails.Writer}
                  </span>
                </div>
                <div>
                  <strong>Awards:</strong>{" "}
                  <span className="text-muted-foreground">
                    {movieDetails.Awards}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                {/* IMDB Rating */}
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="font-bold">
                      {movieDetails.imdbRating}/10
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {movieDetails.imdbVotes} votes
                    </div>
                  </div>
                </div>

                {/* Metascore */}
                <div className="flex items-center gap-2">
                  <Clapperboard className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-bold">{movieDetails.Metascore}</div>
                    <div className="text-xs text-muted-foreground">
                      Metascore
                    </div>
                  </div>
                </div>

                {/* Released */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-bold">{movieDetails.Released}</div>
                    <div className="text-xs text-muted-foreground">
                      Released
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
