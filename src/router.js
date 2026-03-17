import { createBrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import AppLayout from "./layouts/AppLayout";
import NotFoundPage from "./pages/NotFoundPage";
import ScpListPage from "./pages/ScpListPage";
import ScpDetailsPage from "./pages/ScpDetailsPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import CategoryListPage from "./pages/CategoryListPage";
import AdminPanelPage from "./pages/admin/AdminPanelPage";
import AdminArticlePage from "./pages/admin/AdminArticlePage";
import AdminArticleNotesPage from "./pages/admin/AdminArticleNotesPage";
import AdminArticleCategoriesPage from "./pages/admin/AdminArticleCategoriesPage";
import AdminArticleScpPage from "./pages/admin/AdminArticleScpPage";
import AdminScpListPage from "./pages/admin/AdminScpListPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";

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
            path: ":id",
            Component: ScpDetailsPage,
            handle: { crumb: "scp-id" },
          },
          {
            path: "not-found",
            Component: NotFoundPage,
            handle: { crumb: "not-found" },
          },
        ],
      },
      {
        path: "articles",
        handle: { crumb: "articles" },
        children: [
          { index: true, Component: ArticleListPage },
          {
            path: ":id",
            Component: ArticleDetailsPage,
            handle: { crumb: "article-id" },
          },
          { path: "not-found", Component: NotFoundPage, handle: { crumb: "not-found" } },
        ],
      },
      {
        path: "categories",
        handle: { crumb: "categories" },
        children: [
          { index: true, Component: CategoryListPage },
          {
            path: ":id",
            Component: ArticleDetailsPage,
            handle: { crumb: "category-id" },
          },
          { path: "not-found", Component: NotFoundPage, handle: { crumb: "not-found" } },
        ],
      },
      {
        path: "admin",
        handle: { crumb: "admin" },
        children: [
          { index: true, Component: AdminPanelPage },
          {
            path: "articles",
            handle: { crumb: "articles" },
            children: [
              { index: true, Component: AdminArticlePage },
              { path: "notes/:id", Component: AdminArticleNotesPage, handle: { crumb: "article-notes" } },
              {
                path: "categories/:id",
                Component: AdminArticleCategoriesPage,
                handle: { crumb: "article-categories" },
              },
              {
                path: "scps/:id",
                Component: AdminArticleScpPage,
                handle: { crumb: "article-scps" },
              },
              { path: "not-found", Component: NotFoundPage, handle: { crumb: "not-found" } },
            ],
          },
          {
            path: "scps",
            handle: { crumb: "scps" },
            children: [
              { index: true, Component: AdminScpListPage },
              { path: "not-found", Component: NotFoundPage, handle: { crumb: "not-found" } },
            ],
          },
          {
            path: "categories",
            handle: { crumb: "categories" },
            children: [
              { index: true, Component: AdminCategoriesPage },
              { path: "not-found", Component: NotFoundPage, handle: { crumb: "not-found" } },
            ],
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
