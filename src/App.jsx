import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router/dom";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";

import { router } from "@/router";
import { store } from "@/store";
import { theme } from "@/theme";

import "./style.css";

function App() {
  return (
    <ReduxProvider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <RouterProvider router={router} />
        <ToastContainer />
      </MantineProvider>
    </ReduxProvider>
  );
}

export default App;
