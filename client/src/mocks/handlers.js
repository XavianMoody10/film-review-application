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
import movieDetailsMockdata from "./mockdata/movieDetails.mockdata";
import tvShowDetailsMockdata from "./mockdata/tvShowDetails.mockdata";

export const handlers = [
  http.get(
    "https://localhost:3001/movies/now_playing/:page",
    async ({ params }) => {
      await delay(3000);
      const { page } = params;

      const data = nowPlayingMoviesMockdata.find((d) => d.page == page);
      return HttpResponse.json(data);

      // if (page == 2) {
      //   return HttpResponse.json(null, { status: 400 });
      // } else {
      //   const data = nowPlayingMoviesMockdata.find((d) => d.page == page);
      //   return HttpResponse.json(data);
      // }
    }
  ),

  http.get("https://localhost:3001/movies/popular/:page", async () => {
    // await delay(3000);
    return HttpResponse.json(popularMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/movies/top_rated/:page", async () => {
    // await delay(3000);
    return HttpResponse.json(topRatedMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/movies/upcoming/:page", async () => {
    // await delay(3000);
    return HttpResponse.json(upcomingMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/movies/trending", async () => {
    // await delay(3000);
    return HttpResponse.json(trendingMoviesMockdata);
    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/movies/details/:id", async ({ params }) => {
    // await delay(3000);
    const { id } = params;

    if (id == "83533") {
      return HttpResponse.json(movieDetailsMockdata);
    } else {
      return HttpResponse.json(null, { status: 404 });
    }

    // return HttpResponse.json(null, { status: 400 });
  }),

  http.get("https://localhost:3001/tv/details/:id", async ({ params }) => {
    // await delay(3000);
    const { id } = params;

    if (id == "22980") {
      return HttpResponse.json(tvShowDetailsMockdata);
    } else {
      return HttpResponse.json(null, { status: 404 });
    }

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

  http.get("https://localhost:3001/reviews", async () => {
    await delay(3000);

    return HttpResponse.json([
      {
        id: "1",
        title: "This was a wonderful movie!!!",
        review: "This is a review",
        rating: 4.5,
      },
    ]);

    // return HttpResponse.json([]);

    // return HttpResponse.json(null, { status: 400 });
  }),

  http.post("https://localhost:3001/reviews", async ({ request }) => {
    const data = await request.json();

    await delay(3000);

    return HttpResponse.json([
      {
        id: "1",
        title: "This was a wonderful movie!!!",
        review: "This is a review",
        rating: 4.5,
      },
      {
        id: "2",
        title: data.title,
        review: data.review,
        rating: data.rating,
      },
    ]);
    // return HttpResponse.json(null, { status: 400 });
  }),
];
