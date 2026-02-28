import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./page/Home";
import { Details } from "./page/Details";
import { SideNavigationProvider } from "./contexts/SideNavigationContext";
import { Explore } from "./page/Explore";
import { SideNavigation } from "./components/SideNavigation";
import { Header } from "./components/Header";

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
          <Route path="/details/:mediaType/:mediaId" element={<Details />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
        </Route>
      </Route>,
    ),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SideNavigationProvider>
        <RouterProvider router={router} />
      </SideNavigationProvider>
    </QueryClientProvider>
  );
};

export default App;
