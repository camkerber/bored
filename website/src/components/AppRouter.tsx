import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "../App";
import {Home} from "@bored/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
