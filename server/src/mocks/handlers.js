import { delay, http, HttpResponse } from "msw";
import nowPlayingMoviesMockdata from "./mockdata/nowPlayingMovies.mockdata.js";

export const handlers = [
  http.get("https://api.themoviedb.org/3/movie/now_playing", async () => {
    await delay(3000);
    return HttpResponse.json(nowPlayingMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),
];
