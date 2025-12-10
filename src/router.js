import { createBrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import ScpList from "./pages/ScpList";
import NotFoundPage from "./pages/NotFoundPage";
import ScpItem from "./pages/ScpPage";
import AppLayout from "./layouts/AppLayout";

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "scp",
        handle: { crumb: "Scp" },
        children: [
          { index: true, Component: ScpList },
          {
            path: "not-found",
            Component: NotFoundPage,
            handle: { crumb: "Not found" },
          },
          {
            path: ":id",
            Component: ScpItem,
            handle: { crumb: "Scp-id" },
          },
        ],
      },
      {
        path: "*",
        Component: NotFoundPage,
        handle: { crumb: "Not found" },
      },
    ],
  },
]);
