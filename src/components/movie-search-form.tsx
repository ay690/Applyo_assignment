"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchMovies,
  setSearchParams,
  selectMoviesState,
} from "@/lib/store/moviesSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const searchSchema = z.object({
  query: z.string().min(2, "Search term must be at least 2 characters"),
  type: z.enum(["all", "movie", "series"]).optional(),
  year: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}$/.test(val), {
      message: "Enter a valid 4-digit year",
    }),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export default function MovieSearchForm() {
  const dispatch = useAppDispatch();
  const { searchParams: currentParams, status } = useAppSelector(selectMoviesState);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: currentParams.query,
      type: (currentParams.type || "all") as "all" | "movie" | "series",
      year: currentParams.year,
    },
  });

  const onSubmit = (values: SearchFormValues) => {
    const newParams = {
      query: values.query || "avengers",
      type: values.type === "all" ? "" : values.type || "",
      year: values.year || "",
      page: 1,
    };
    dispatch(setSearchParams(newParams));
    dispatch(fetchMovies(newParams));
  };

  return (
    <div className="flex justify-center mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-5 bg-card rounded-lg shadow-lg w-full max-w-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            {/* Movie Title */}
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The Avengers..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="movie">Movie</SelectItem>
                      <SelectItem value="series">Series</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Year */}
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2012" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Search Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={status === "loading"}
            >
              <Search className="mr-2 h-4 w-4" />
              {status === "loading" ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
