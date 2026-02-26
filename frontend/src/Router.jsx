import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/ContactPage";

const router = createBrowserRouter([
  {
    element: <Layout />,  // Layout wrap karega har page ko hello
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;