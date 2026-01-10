import { Button, Stack } from "@mantine/core";
import { Link } from "react-router";

export default function Sidebar({ toggle, navItems }) {
  return (
    <Stack pt="10px" align="center" h="100%" bg="brown.7">
      {navItems.map((item, index) => {
        return (
          <Button
            key={`sidebar-${index}`}
            component={Link}
            to={item.path}
            onClick={toggle}
            size="md"
            variant="filled"
            w="90%"
            radius="md"
            color="brown.0"
            c="beige.2"
          >
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
}
