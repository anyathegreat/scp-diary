import { Box, Button, Stack } from "@mantine/core";

import FormScp from "../components/FormScp";

import { handleTimeLogin } from "../testItem";

export default function ScpFormPage() {
  return (
    <Stack align="center">
      <Box visibleFrom="sm">
        <FormScp />
        <Button onClick={() => handleTimeLogin()}>Получить токен</Button>
      </Box>
    </Stack>
  );
}
