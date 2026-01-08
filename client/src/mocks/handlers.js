import { delay, http, HttpResponse } from "msw";
import nowPlayingMoviesMockdata from "./mockdata/nowPlayingMovies.mockdata";
import popularMoviesMockdata from "./mockdata/popularMovies.mockdata";
import topRatedMoviesMockdata from "./mockdata/topRatedMovies.mockdata";
import upcomingMoviesMockdata from "./mockdata/upcomingMovies.mockdata";
import trendingMoviesMockdata from "./mockdata/trendingMovies.mockdata";
import trendingTVShowsMockdata from "./mockdata/trendingTVShows.mockdata";
import airingTodayTVMockdata from "./mockdata/airingTodayTV.mockdata";
import onTheAirTVShowsMockdata from "./mockdata/onTheAirTVShows.mockdata";
import popularTVShowsMockdata from "./mockdata/popularTVShows.mockdata";
import topRatedTVShowsMockdata from "./mockdata/topRatedTVShows.mockdata";

export const handlers = [
  http.get("https://localhost:3001/movies/now_playing", async () => {
    await delay(3000);
    return HttpResponse.json(nowPlayingMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/movies/popular", async () => {
    // await delay(3000);
    return HttpResponse.json(popularMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/movies/top_rated", async () => {
    // await delay(3000);
    return HttpResponse.json(topRatedMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/movies/upcoming", async () => {
    // await delay(3000);
    return HttpResponse.json(upcomingMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/movies/trending", async () => {
    // await delay(3000);
    return HttpResponse.json(trendingMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/tv/trending", async () => {
    // await delay(3000);
    return HttpResponse.json(trendingTVShowsMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/tv/airing_today", async () => {
    await delay(3000);
    return HttpResponse.json(airingTodayTVMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/tv/on_the_air", async () => {
    await delay(3000);
    return HttpResponse.json(onTheAirTVShowsMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/tv/popular", async () => {
    await delay(3000);
    return HttpResponse.json(popularTVShowsMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/tv/top_rated", async () => {
    await delay(3000);
    return HttpResponse.json(topRatedTVShowsMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),
];
