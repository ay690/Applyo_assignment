/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Movie, MovieSearchResult, MovieDetails } from "@/types/movie";
import { OMDb_API_KEY } from "@/lib/config";

interface SearchParams {
  query: string;
  type: string;
  year: string;
  page: number;
}

interface MoviesState {
  movies: Movie[];
  movieDetails: MovieDetails | null;
  totalResults: number;
  searchParams: SearchParams;
  status: "idle" | "loading" | "succeeded" | "failed";
  detailsStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  detailsError: string | null;
}

const initialState: MoviesState = {
  movies: [],
  movieDetails: null,
  totalResults: 0,
  searchParams: {
    query: "avengers",
    type: "",
    year: "",
    page: 1,
  },
  status: "idle",
  detailsStatus: "idle",
  error: null,
  detailsError: null,
};

const API_URL = `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}`;

export const fetchMovies = createAsyncThunk<MovieSearchResult, SearchParams>(
  "movies/fetchMovies",
  async ({ query, type, year, page }, { rejectWithValue }) => {
    let url = `${API_URL}&s=${encodeURIComponent(query)}&page=${page}`;
    if (type) url += `&type=${type}`;
    if (year) url += `&y=${year}`;

    try {
      const response = await fetch(url);
      const data: MovieSearchResult = await response.json();
      if (data.Response === "False") {
        return rejectWithValue(data.Error || "Unknown error");
      }
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch data");
    }
  }
);

export const fetchMovieDetails = createAsyncThunk<MovieDetails, string>(
  "movies/fetchMovieDetails",
  async (imdbID, { rejectWithValue }) => {
    const url = `${API_URL}&i=${imdbID}&plot=full`;
    try {
      const response = await fetch(url);
      const data: MovieDetails = await response.json();
      if (data.Response === "False") {
        return rejectWithValue(data.Error || "Unknown error");
      }
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch details");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<Partial<SearchParams>>) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    clearMovieDetails: (state) => {
      state.movieDetails = null;
      state.detailsStatus = "idle";
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.Search;
        state.totalResults = parseInt(action.payload.totalResults, 10);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.movies = [];
        state.totalResults = 0;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.detailsStatus = "loading";
        state.detailsError = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.detailsError = action.payload as string;
      });
  },
});

export const { setSearchParams, clearMovieDetails } = moviesSlice.actions;

export const selectMoviesState = (state: RootState) => state.movies;

export default moviesSlice.reducer;
