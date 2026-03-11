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
