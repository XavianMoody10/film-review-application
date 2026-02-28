export async function startMockServiceWorker() {
  if (process.env.NODE_ENV === "development") {
    const { setupServer } = await import("msw/node");
    const { handlers } = await import("./handlers.js");
    const server = setupServer(...handlers);
    server.listen();
    console.log("Mock Service Worker has started");
  } else {
    return;
  }
}
