// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import trendingMoviesMockdata from "./mockdata/trendingMovies.mockdata.js";

export const handlers = [
  http.get("https://api.themoviedb.org/3/trending/movie/day", () => {
    // return HttpResponse.json(trendingMoviesMockdata);
    return HttpResponse.json(null, { status: 400 });
  }),
];
