import { setupServer } from "msw/node";
import { handlers } from "./handlers.js";

export const server = setupServer(...handlers);

export async function initiateMockServiceWorker() {
  if (process.env.NODE_ENV === "development") {
    const { setupServer } = await import("msw/node");
    const { handlers } = await import("./handlers");
    const server = setupServer(...handlers);
    server.listen();
    console.log("Mock Service Worker has started");
  } else {
    return;
  }
}
