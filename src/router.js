import { createBrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import AppLayout from "./layouts/AppLayout";
import NotFoundPage from "./pages/NotFoundPage";
import ScpListPage from "./pages/ScpListPage";
import ScpDetailsPage from "./pages/ScpDetailsPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import CategoryListPage from "./pages/CategoryListPage";

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
          {
            path: ":id",
            Component: ScpDetailsPage,
            handle: { crumb: "scp-id" },
          },
        ],
      },
      {
        path: "articles",
        handle: { crumb: "articles" },
        children: [
          { index: true, Component: ArticleListPage },
          { path: "not-found", Component: NotFoundPage, handle: { crumb: "not found" } },
          {
            path: ":id",
            Component: ArticleDetailsPage,
            handle: { crumb: "article-id" },
          },
        ],
      },
      {
        path: "categories",
        handle: { crumb: "categories" },
        children: [
          { index: true, Component: CategoryListPage },
          { path: "not-found", Component: NotFoundPage, handle: { crumb: "not found" } },
          {
            path: ":id",
            Component: ArticleDetailsPage,
            handle: { crumb: "category-id" },
          },
        ],
      },
      {
        path: "*",
        Component: NotFoundPage,
        handle: { crumb: "not found" },
      },
    ],
  },
]);
