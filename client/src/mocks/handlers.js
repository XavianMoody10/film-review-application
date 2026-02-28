// src/mocks/handlers.ts
import { delay, http, HttpResponse } from "msw";
import trendingAllMockdata from "./mockdata/trendingAll.mockdata";
import movieDetailMockdata from "./mockdata/movieDetail.mockdata";
import movieCreditsMockdata from "./mockdata/movieCredits.mockdata";
import movieImagesMockdata from "./mockdata/movieImages.mockdata";
import movieReviewsMockdata from "./mockdata/movieReviews.mockdata";
import tvShowDetailsMockdata from "./mockdata/tvShowDetails.mockdata";
import tvShowCreditsMockdata from "./mockdata/tvShowCredits.mockdata";
import tvShowImagesMockdata from "./mockdata/tvShowImages.mockdata";
import moviesGenresMockdata from "./mockdata/moviesGenres.mockdata";
import movieActionMockdata from "./mockdata/movieAction.mockdata";
import tvShowsGenresMockdata from "./mockdata/tvShowsGenres.mockdata";
import actionAndAdventureTVShowsMockdata from "./mockdata/actionAndAdventureTVShows.mockdata";

export const handlers = [
  http.get("http://localhost:3000/trending/all", async () => {
    await delay(3000);
    return HttpResponse.json(trendingAllMockdata);
    // return HttpResponse.json(null, { status: 404 });
  }),

  http.get(
    "http://localhost:3000/media/details/movie/:movie_id",
    async ({ params }) => {
      // await delay(3000);
      const { movie_id } = params;
      console.log(movie_id);
      return HttpResponse.json(movieDetailMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/media/details/tv/:series_id",
    async ({ params }) => {
      // await delay(3000);
      const { series_id } = params;
      return HttpResponse.json(tvShowDetailsMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/media/credits/movie/:movie_id",
    async ({ params }) => {
      await delay(8000);
      const { movie_id } = params;
      console.log(movie_id);
      return HttpResponse.json(movieCreditsMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/media/credits/tv/:series_id",
    async ({ params }) => {
      await delay(8000);
      const { series_id } = params;
      return HttpResponse.json(tvShowCreditsMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/media/images/movie/:movie_id",
    async ({ params }) => {
      await delay(5000);
      const { movie_id } = params;
      console.log(movie_id);
      return HttpResponse.json(movieImagesMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/media/images/tv/:series_id",
    async ({ params }) => {
      await delay(5000);
      const { series_id } = params;
      return HttpResponse.json(tvShowImagesMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get("http://localhost:3000/genres/movie", async () => {
    // await delay(5000);
    console.log("Yo");
    return HttpResponse.json(moviesGenresMockdata);
    // return HttpResponse.json([]);
    // return HttpResponse.json(null, { status: 404 });
  }),

  http.get("http://localhost:3000/genres/tv", async () => {
    // await delay(5000);
    console.log("Yo");
    return HttpResponse.json(tvShowsGenresMockdata);
    // return HttpResponse.json([]);
    // return HttpResponse.json(null, { status: 404 });
  }),

  http.get(
    "http://localhost:3000/discover/movie/:with_genre/:page",
    async ({ params }) => {
      // await delay(5000);
      const { with_genre } = params;
      if (with_genre == 28) {
        return HttpResponse.json(movieActionMockdata);
      }

      // return HttpResponse.json([]);
      return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/discover/tv/:with_genre/:page",
    async ({ params }) => {
      // await delay(5000);
      const { with_genre } = params;
      if (with_genre == 10759) {
        return HttpResponse.json(actionAndAdventureTVShowsMockdata);
      }

      // return HttpResponse.json([]);
      return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/media/reviews/movie/:movie_id",
    async ({ params }) => {
      // await delay(5000);
      const { movie_id } = params;
      console.log(movie_id);
      return HttpResponse.json(movieReviewsMockdata);
      // return HttpResponse.json([]);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),
];
