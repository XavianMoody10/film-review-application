import { delay, http, HttpResponse } from "msw";
import nowPlayingMoviesMockdata from "./mockdata/nowPlayingMovies.mockdata";

export const handlers = [
  http.get("https://localhost:3001/movies/now_playing", async () => {
    await delay(3000);
    return HttpResponse.json(nowPlayingMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),
];
