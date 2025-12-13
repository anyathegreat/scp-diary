import { RouterProvider } from "react-router/dom";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { Provider as ReduxProvider } from "react-redux";

import { router } from "./router";
import { store } from "./store";

import "@mantine/core/styles.css";

function App() {
  return (
    <ReduxProvider store={store}>
      <MantineProvider defaultColorScheme="dark">
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </MantineProvider>
    </ReduxProvider>
  );
}

export default App;
