import { AppShell } from "@mantine/core";
import { Outlet } from "react-router";

import Header from "../components/Header";

export default function AppLayout() {
  return (
    <AppShell padding="sm" header={{ height: "135px" }}>
      <AppShell.Header>
        <Header></Header>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
