"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchMovies, setSearchParams, selectMoviesState } from "@/lib/store/moviesSlice";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls() {
  const dispatch = useAppDispatch();
  const { searchParams, totalResults, status } =
    useAppSelector(selectMoviesState);
  const { page } = searchParams;

  const totalPages = Math.min(Math.ceil(totalResults / 10), 100); // OMDb API limitation

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    const newParams = { ...searchParams, page: newPage };
    dispatch(setSearchParams(newParams));
    dispatch(fetchMovies(newParams));
    window.scrollTo(0, 0);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 4) {
        pages.push("...");
      }
      const start = Math.max(2, page - 2);
      const end = Math.min(totalPages - 1, page + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (page < totalPages - 3) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1 || status === "loading"}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {getPageNumbers().map((p, index) =>
        typeof p === "number" ? (
          <Button
            key={index}
            variant={p === page ? "default" : "outline"}
            size="icon"
            onClick={() => handlePageChange(p)}
            disabled={status === "loading"}
          >
            {p}
          </Button>
        ) : (
          <span key={index} className="px-2 py-1 text-muted-foreground">
            {p}
          </span>
        )
      )}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages || status === "loading"}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
