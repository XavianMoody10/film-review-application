// src/mocks/handlers.ts
import { delay, http, HttpResponse } from "msw";
import trendingAllMockdata from "./mockdata/trendingAll.mockdata.js";
import movieDetailMockdata from "./mockdata/movieDetail.mockdata.js";
import movieCreditsMockdata from "./mockdata/movieCredits.mockdata.js";
import movieImagesMockdata from "./mockdata/movieImages.mockdata.js";
import movieReviewsMockdata from "./mockdata/movieReviews.mockdata.js";
import tvShowDetailsMockdata from "./mockdata/tvShowDetails.mockdata.js";
import tvShowCreditsMockdata from "./mockdata/tvShowCredits.mockdata.js";
import tvShowImagesMockdata from "./mockdata/tvShowImages.mockdata.js";

export const handlers = [
  http.get("https://api.themoviedb.org/3/trending/all/day", async () => {
    await delay(3000);
    return HttpResponse.json(trendingAllMockdata);
    // return HttpResponse.json(null, { status: 404 });
  }),

  http.get(
    "https://api.themoviedb.org/3/movie/:movie_id",
    async ({ params }) => {
      // await delay(3000);
      const { movie_id } = params;
      return HttpResponse.json(movieDetailMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get("https://api.themoviedb.org/3/tv/:series_id", async ({ params }) => {
    // await delay(3000);
    const { series_id } = params;
    return HttpResponse.json(tvShowDetailsMockdata);
    // return HttpResponse.json(null, { status: 404 });
  }),

  http.get(
    "https://api.themoviedb.org/3/movie/:movie_id/credits",
    async ({ params }) => {
      await delay(8000);
      const { movie_id } = params;
      return HttpResponse.json(movieCreditsMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/tv/:series_id/credits",
    async ({ params }) => {
      await delay(8000);
      const { series_id } = params;
      return HttpResponse.json(tvShowCreditsMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/movie/:movie_id/images",
    async ({ params }) => {
      await delay(5000);
      const { movie_id } = params;
      console.log(movie_id);
      return HttpResponse.json(movieImagesMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/tv/:series_id/images",
    async ({ params }) => {
      await delay(5000);
      const { series_id } = params;
      return HttpResponse.json(tvShowImagesMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  // http.get(
  //   "http://localhost:3000/reviews/movie/:movie_id",
  //   async ({ params }) => {
  //     // await delay(5000);
  //     const { movie_id } = params;
  //     console.log(movie_id);
  //     return HttpResponse.json(movieReviewsMockdata);
  //     // return HttpResponse.json([]);
  //     // return HttpResponse.json(null, { status: 404 });
  //   },
  // ),
];
