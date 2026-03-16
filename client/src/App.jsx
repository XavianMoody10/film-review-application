import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { SideNavigationProvider } from "./contexts/SideNavigationContext";
import { Header } from "./components/Header";
import { SideNavigation } from "./components/SideNavigation";
import { GenreCollection } from "./pages/GenreCollection";
import { ListCollection } from "./pages/ListCollection";
import { Details } from "./pages/Details";
import { ActionLoadingProvider } from "./contexts/ActionLoadingContext";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // All routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          element={
            <>
              <Header />
              <SideNavigation />
              <Outlet />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="/explore/:media_type" element={<Explore />} />
          <Route
            path="/collection/list/:media_type/:list_value"
            element={<ListCollection />}
          />
          <Route
            path="/collection/genre/:media_type/:genre_id"
            element={<GenreCollection />}
          />
          <Route path="/details/:media_type/:media_id" element={<Details />} />
        </Route>
      </Route>,
    ),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ActionLoadingProvider>
        <SideNavigationProvider>
          <RouterProvider router={router} />
        </SideNavigationProvider>
      </ActionLoadingProvider>
    </QueryClientProvider>
  );
};

export default App;
