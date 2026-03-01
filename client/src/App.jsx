import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./page/Home";
import { Details } from "./page/Details";
import { SideNavigationProvider } from "./contexts/SideNavigationContext";
import { Explore } from "./page/Explore";
import { AuthFormsProvider } from "./contexts/AuthFormsContext";
import { Template } from "./templates/Template";
import { UserProvider } from "./contexts/UserContext";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // All routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<Template />}>
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
        <AuthFormsProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </AuthFormsProvider>
      </SideNavigationProvider>
    </QueryClientProvider>
  );
};

export default App;
