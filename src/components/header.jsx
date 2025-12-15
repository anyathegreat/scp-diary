import { Button, Divider, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router";
import { IconHome, IconLibrary, IconBook, IconSquareRoundedPlus } from "@tabler/icons-react";

const navigationItems = [
  { icon: <IconHome size={18} />, label: "Главная", path: "/" },
  { icon: <IconLibrary size={18} />, label: "SCP объекты", path: "scp" },
  { icon: <IconBook size={18} />, label: "Список статей", path: "posts" },
];

export default function Header() {
  return (
    <Stack mt="md" align="center" gap="sm">
      <Text fw={700} size="34px">
        ДНЕВНИК ИССЛЕДОВАТЕЛЯ
      </Text>
      <Divider mb="md" />

      <Group justify="space-between">
        {navigationItems.map((item, index) => {
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
  );
}
