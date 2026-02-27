// src/mocks/handlers.ts
import { delay, http, HttpResponse } from "msw";
import trendingAllMockdata from "./mockdata/trendingAll.mockdata";
import movieDetailMockdata from "./mockdata/movieDetail.mockdata";
import movieCreditsMockdata from "./mockdata/movieCredits.mockdata";
import movieImagesMockdata from "./mockdata/movieImages.mockdata";
import movieReviewsMockdata from "./mockdata/movieReviews.mockdata";

export const handlers = [
  http.get("http://localhost:3000/trending/all", async () => {
    await delay(3000);
    return HttpResponse.json(trendingAllMockdata);
    // return HttpResponse.json(null, { status: 404 });
  }),

  http.get(
    "http://localhost:3000/details/movie/:movie_id",
    async ({ params }) => {
      // await delay(3000);
      const { movie_id } = params;
      console.log(movie_id);
      return HttpResponse.json(movieDetailMockdata);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/credits/movie/:movie_id",
    async ({ params }) => {
      await delay(8000);
      const { movie_id } = params;
      console.log(movie_id);
      // return HttpResponse.json(movieCreditsMockdata);
      return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/images/movie/:movie_id",
    async ({ params }) => {
      await delay(5000);
      const { movie_id } = params;
      console.log(movie_id);
      // return HttpResponse.json(movieImagesMockdata);
      return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.get(
    "http://localhost:3000/reviews/movie/:movie_id",
    async ({ params }) => {
      // await delay(5000);
      const { movie_id } = params;
      console.log(movie_id);
      // return HttpResponse.json(movieReviewsMockdata);
      return HttpResponse.json([]);
      // return HttpResponse.json(null, { status: 404 });
    },
  ),
];
