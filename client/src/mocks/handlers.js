// src/mocks/handlers.ts
import { delay, http, HttpResponse } from "msw";
import trendingAllMockdata from "./mockdata/trendingAll.mockdata";

export const handlers = [
  http.get("http://localhost:3000/trending/all", async () => {
    await delay(3000);
    return HttpResponse.json(trendingAllMockdata);
    // return HttpResponse.json(null, { status: 404 });
  }),
];
