import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { Movies } from "./pages/Movies";
import { Collection } from "./pages/Collection";
import { TV } from "./pages/TV";
import { SideNavigationProvider } from "./contexts/SideNavigationContext";
import { Header } from "./layouts/Header";
import { SideNavigation } from "./layouts/SideNavigation";

// Create a client
const queryClient = new QueryClient();

function App() {
  // All routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <>
              <Header />
              <SideNavigation />
              <Outlet />
            </>
          }
        >
          <Route index element={<Home />} />

          <Route path="/movies">
            <Route index element={<Movies />} />
            <Route path="collection/:list" element={<Collection />} />
          </Route>

          <Route path="/tv">
            <Route index element={<TV />} />
            <Route path="collection/:list" element={<Collection />} />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SideNavigationProvider>
        <RouterProvider router={router} />
      </SideNavigationProvider>
    </QueryClientProvider>
  );
}

export default App;
