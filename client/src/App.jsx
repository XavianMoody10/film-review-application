import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { Movies } from "./pages/Movies";
import { Collection } from "./pages/Collection";

// Create a client
const queryClient = new QueryClient();

function App() {
  // All routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Home />} />

        <Route path="/movies">
          <Route index element={<Movies />}></Route>
          <Route path="collection/:list" element={<Collection />}></Route>
        </Route>
      </>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
