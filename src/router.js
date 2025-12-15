import { createBrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import ScpListPage from "./pages/ScpListPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./layouts/AppLayout";
import ScpDetailsPage from "./pages/ScpDetailsPage";
import ScpPostPage from "./pages/ScpPostPage";

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "scp",
        handle: { crumb: "Scp" },
        children: [
          { index: true, Component: ScpListPage },
          {
            path: "not-found",
            Component: NotFoundPage,
            handle: { crumb: "Not found" },
          },
          {
            path: ":id",
            Component: ScpDetailsPage,
            handle: { crumb: "Scp-id" },
          },
        ],
      },
      {
        path: "posts",
        Component: ScpPostPage,
        handle: { crumb: "posts" },
      },
      {
        path: "*",
        Component: NotFoundPage,
        handle: { crumb: "Not found" },
      },
    ],
  },
]);
