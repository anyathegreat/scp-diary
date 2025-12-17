import { Button, Stack } from "@mantine/core";
import { Link } from "react-router";

export default function Sidebar({ toggle, navItem }) {
  return (
    <Stack mt="10px" align="center">
      {navItem.map((item, index) => {
        return (
          <Button w="200px" key={`sidebar-${index}`} component={Link} to={item.path} onClick={toggle} color="#756d6d">
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
}
