"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450";

  return (
    <Card
      className="overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 border-2 border-transparent hover:border-accent"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={posterUrl}
            alt={`Poster for ${movie.Title}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            className="object-cover"
            data-ai-hint="movie poster"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg leading-tight truncate group-hover:text-accent transition-colors duration-300">
          {movie.Title}
        </CardTitle>
        <div className="flex justify-between items-center text-muted-foreground">
          <Badge variant="outline" className="capitalize">
            {movie.Type}
          </Badge>
          <span>{movie.Year}</span>
        </div>
      </CardContent>
    </Card>
  );
}
