import { Outlet } from "react-router";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconLibrary, IconBook } from "@tabler/icons-react";

import Header from "../components/header";
import Sidebar from "../components/Sidebar";

const navigationItems = [
  { icon: <IconHome size={18} />, label: "Главная", path: "/" },
  { icon: <IconLibrary size={18} />, label: "SCP объекты", path: "scp" },
  { icon: <IconBook size={18} />, label: "Список статей", path: "posts" },
];

export default function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="sm"
      header={{ height: "135px" }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: true },
      }}
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} navItem={navigationItems} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar toggle={toggle} navItem={navigationItems} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
