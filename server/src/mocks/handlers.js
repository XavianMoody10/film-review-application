import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3001/hello_world", () => {
    return HttpResponse.text("Hello World");
  }),
];
