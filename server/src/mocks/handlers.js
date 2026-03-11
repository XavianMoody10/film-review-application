// src/mocks/handlers.ts
import { delay, http, HttpResponse } from "msw";
import trendingMoviesMockdata from "./mockdata/trendingMovies.mockdata.js";
import trendingAllMockdata from "./mockdata/trendingAll.mockdata.js";

export const handlers = [
  http.get("https://api.themoviedb.org/3/trending/all/day", async () => {
    await delay(3000);
    return HttpResponse.json(trendingAllMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),
  // http.get("https://api.themoviedb.org/3/trending/tv/day", () => {
  //   // return HttpResponse.json(trendingMoviesMockdata);
  //   return HttpResponse.json(null, { status: 400 });
  // }),
  // http.get("https://api.themoviedb.org/3/trending/movie/day", () => {
  //   // return HttpResponse.json(trendingMoviesMockdata);
  //   return HttpResponse.json(null, { status: 400 });
  // }),
];
