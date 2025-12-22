import { createBrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import ScpListPage from "./pages/ScpListPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./layouts/AppLayout";
import ScpDetailsPage from "./pages/ScpDetailsPage";
import ScpArticlePage from "./pages/ScpArticlePage";
import ScpFormPage from "./pages/ScpFormPage";

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "scp",
        handle: { crumb: "scp" },
        children: [
          { index: true, Component: ScpListPage },
          {
            path: "not-found",
            Component: NotFoundPage,
            handle: { crumb: "not found" },
          },
          { path: "create", Component: ScpFormPage, handle: { crumb: "create scp" } },
          {
            path: ":id",
            Component: ScpDetailsPage,
            handle: { crumb: "scp-id" },
          },
        ],
      },
      {
        path: "articles",
        Component: ScpArticlePage,
        handle: { crumb: "article" },
      },
      {
        path: "*",
        Component: NotFoundPage,
        handle: { crumb: "not found" },
      },
    ],
  },
]);
