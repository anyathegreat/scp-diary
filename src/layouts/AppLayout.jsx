import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { AppShell, Box, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { attachGarland } from "@/helpers/lights";
import { navigationItems } from "@/constants/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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
      bg="beige.1"
      align="center"
    >
      <Stack maw="1200px">
        <AppShell.Header ref={headerRef}>
          <Header opened={opened} toggle={toggle} navItems={navigationItems} />
        </AppShell.Header>

        <AppShell.Navbar>
          <Sidebar toggle={toggle} navItems={navigationItems} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Box p="20px" mih="100%">
            <Outlet />
          </Box>
        </AppShell.Main>
      </Stack>
    </AppShell>
  );
}
