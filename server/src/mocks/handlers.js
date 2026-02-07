import { delay, http, HttpResponse } from "msw";
import nowPlayingMoviesMockdata from "./mockdata/nowPlayingMovies.mockdata.js";
import movieDetailMockdata from "./mockdata/movieDetail.mockdata.js";
import nowPlayingMoviesPage2Mockdata from "./mockdata/nowPlayingMoviesPage2.mockdata.js";

export const handlers = [
  http.get(
    "https://api.themoviedb.org/3/movie/now_playing",
    async ({ request }) => {
      await delay(3000);

      const url = new URL(request.url);

      const page = url.searchParams.get("page");

      if (page === "1") {
        return HttpResponse.json(nowPlayingMoviesMockdata);
      }

      if (page === "2") {
        return HttpResponse.json(null, { status: 400 });

        // return HttpResponse.json(nowPlayingMoviesPage2Mockdata);
      }

      // return HttpResponse.json(null, { status: 400 });
    },
  ),

  http.get("https://api.themoviedb.org/3/movie/840464", async () => {
    await delay(3000);
    return HttpResponse.json(movieDetailMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),
];
