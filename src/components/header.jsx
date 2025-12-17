import { Link } from "react-router";
import { Burger, Button, Divider, Group, Stack, Text } from "@mantine/core";

export default function Header({ opened, toggle, navItem }) {
  return (
    <Stack h="100%" gap="1px" mt="5px" ml="5px">
      <Burger hiddenFrom="sm" opened={opened} onClick={toggle} aria-label="Toggle navigation" />

      <Stack mt="10" align="center" gap="5px">
        <Text ta="center" fw={700} size="34px">
          ДНЕВНИК ИССЛЕДОВАТЕЛЯ
        </Text>

        <Divider mb="md" />

        <Group justify="space-between" visibleFrom="sm">
          {navItem.map((item, index) => {
            return (
              <Button
                color="#756d6d"
                key={`nav-${index}`}
                component={Link}
                to={item.path}
                leftSection={item.icon}
                px="md"
              >
                {item.label}
              </Button>
            );
          })}
        </Group>
      </Stack>
    </Stack>
  );
}
