import { Link } from "react-router";
import { Burger, Button, Divider, Group, Stack, Text } from "@mantine/core";

export default function Header({ opened, toggle, navItems }) {
  return (
    <Stack h="100%" gap="12" bg="brown.7" pt="sm" pl="md">
      <Burger hiddenFrom="sm" opened={opened} onClick={toggle} aria-label="Toggle navigation" color="beige.12" />

      <Stack w={{ base: "90%", sm: "100%" }} pl="md" gap="0px" align="center">
        <Text
          ta="center"
          fw={700}
          c="beige.2"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          ДНЕВНИК ИССЛЕДОВАТЕЛЯ
        </Text>

        <Divider w="500px" visibleFrom="sm" size="2px" color="brown.0" />
      </Stack>

      <Group w="100%" justify="center" visibleFrom="sm">
        {navItems.map((item, index) => {
          return (
            <Button
              key={`nav-${index}`}
              component={Link}
              to={item.path}
              leftSection={item.icon}
              variant="filled"
              c="beige.2"
              radius="md"
            >
              {item.label}
            </Button>
          );
        })}
      </Group>
    </Stack>
  );
}
