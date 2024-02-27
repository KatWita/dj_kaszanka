import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import {
  HomePage,
  AboutPage,
  AlbumsPage,
  ToursPage,
  GalleryPage,
  ContactPage,
} from "./pages";

// loaders
// import { loader as toursLoader } from "./pages/ToursPage";
// import { loader as albumsLoader } from "./pages/AlbumsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "albums",
        element: <AlbumsPage />,
        // loader: albumsLoader,
      },
      {
        path: "tours",
        element: <ToursPage />,
        // loader: toursLoader,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
