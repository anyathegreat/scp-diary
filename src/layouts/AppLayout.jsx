import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { AppShell, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBook, IconHome, IconLibrary } from "@tabler/icons-react";

import { attachGarland } from "../helpers/lights";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const navigationItems = [
  { icon: <IconHome size={18} />, label: "Главная", path: "/" },
  { icon: <IconLibrary size={18} />, label: "SCP объекты", path: "scp" },
  { icon: <IconBook size={18} />, label: "Список статей", path: "articles" },
];

export default function AppLayout() {
  const headerRef = useRef(null);

  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    if (headerRef.current) attachGarland(headerRef.current, { position: "bottom", bulbs: 20 });
  }, [headerRef]);

  return (
    <AppShell
      header={{ height: "160px" }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: true },
      }}
    >
      <AppShell.Header ref={headerRef}>
        <Header opened={opened} toggle={toggle} navItems={navigationItems} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar toggle={toggle} navItems={navigationItems} />
      </AppShell.Navbar>

      <AppShell.Main h="0px">
        <Box bg="beige.1" p="20px" mih="100%">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
