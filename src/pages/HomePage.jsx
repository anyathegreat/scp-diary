import { Box, Button } from "@mantine/core";

import { handleTimeLogin } from "../testItem";

export default function HomePage() {
  return (
    <Box>
      <Button onClick={() => handleTimeLogin()}>Получить токен</Button>
    </Box>
  );
}
