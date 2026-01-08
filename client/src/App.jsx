import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./page/Home";

function App() {
  // All routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Home />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
