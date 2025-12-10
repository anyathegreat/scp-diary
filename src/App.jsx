import { RouterProvider } from "react-router/dom";
import { MantineProvider } from "@mantine/core";

import { router } from "./router";

import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={router}></RouterProvider>
    </MantineProvider>
  );
}

export default App;
