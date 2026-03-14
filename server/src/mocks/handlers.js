// src/mocks/handlers.ts
import { delay, http, HttpResponse } from "msw";
import trendingMoviesMockdata from "./mockdata/trendingMovies.mockdata.js";
import trendingAllMockdata from "./mockdata/trendingAll.mockdata.js";
import nowPlayingMoviesMockdata from "./mockdata/nowPlayingMovies.mockdata.js";
import moviesGenresMockdata from "./mockdata/moviesGenres.mockdata.js";
import actionMoviesMockdata from "./mockdata/actionMovies.mockdata.js";
import tvAiringTodayMockdata from "./mockdata/tvAiringToday.mockdata.js";
import trendingTVMockdata from "./mockdata/trendingTV.mockdata.js";
import tvGenresMockdata from "./mockdata/tvGenres.mockdata.js";
import actionTVMockdata from "./mockdata/actionTV.mockdata.js";
import movieDetailsMockdata from "./mockdata/movieDetails.mockdata.js";

export const handlers = [
  http.get("https://api.themoviedb.org/3/trending/all/day", async () => {
    await delay(3000);
    return HttpResponse.json(trendingAllMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/trending/movie/day", () => {
    return HttpResponse.json(trendingMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/trending/tv/day", () => {
    return HttpResponse.json(trendingTVMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/movie/now_playing", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");

    return HttpResponse.json(
      nowPlayingMoviesMockdata.find((t) => {
        return t.page == page;
      }),
    );
    // return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/movie/popular", () => {
    // return HttpResponse.json(nowPlayingMoviesMockdata);
    return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/movie/top_rated", () => {
    // return HttpResponse.json(nowPlayingMoviesMockdata);
    return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/movie/upcoming", () => {
    // return HttpResponse.json(nowPlayingMoviesMockdata);
    return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://api.themoviedb.org/3/tv/airing_today", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");

    return HttpResponse.json(
      tvAiringTodayMockdata.find((t) => {
        return t.page == page;
      }),
    );

    // return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/tv/on_the_air", () => {
    // return HttpResponse.json(nowPlayingMoviesMockdata);
    return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/tv/popular", () => {
    // return HttpResponse.json(nowPlayingMoviesMockdata);
    return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/tv/top_rated", () => {
    // return HttpResponse.json(nowPlayingMoviesMockdata);
    return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://api.themoviedb.org/3/genre/movie/list", () => {
    return HttpResponse.json(moviesGenresMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),
  http.get("https://api.themoviedb.org/3/genre/tv/list", () => {
    return HttpResponse.json(tvGenresMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://api.themoviedb.org/3/discover/movie", ({ request }) => {
    const url = new URL(request.url);
    const with_genres = url.searchParams.get("with_genres");
    const page = url.searchParams.get("page");

    if (with_genres == 28) {
      return HttpResponse.json(
        actionMoviesMockdata.find((t) => {
          return t.page == page;
        }),
      );
    } else {
      return HttpResponse.json(null, { status: 400 });
    }
  }),

  http.get("https://api.themoviedb.org/3/discover/tv", ({ request }) => {
    const url = new URL(request.url);
    const with_genres = url.searchParams.get("with_genres");
    const page = url.searchParams.get("page");

    if (with_genres == 10759) {
      return HttpResponse.json(
        actionTVMockdata.find((t) => {
          return t.page == page;
        }),
      );
    } else {
      return HttpResponse.json(null, { status: 400 });
    }
  }),

  http.get("https://api.themoviedb.org/3/movie/934433", async () => {
    await delay(3000);
    return HttpResponse.json(movieDetailsMockdata);
  }),
];
