import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";

// Every page except Home is its own chunk, loaded the first time you open it
// (e.g. the Sanity client only downloads when you visit Tours).
const page = (load) => async () => ({ Component: (await load()).default });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", lazy: page(() => import("./pages/AboutPage")) },
      { path: "albums", lazy: page(() => import("./pages/AlbumsPage")) },
      { path: "tours", lazy: page(() => import("./pages/ToursPage")) },
      { path: "gallery", lazy: page(() => import("./pages/GalleryPage")) },
      { path: "contact", lazy: page(() => import("./pages/ContactPage")) },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
