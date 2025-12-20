import { Box, Button, Stack } from "@mantine/core";

import FormScp from "../components/FormScp";

import { handleTimeLogin } from "../testItem";

export default function ScpFormPage() {
  return (
    <Stack align="center">
      <Box>
        <FormScp />
        <Button mt="md" onClick={() => handleTimeLogin()}>
          Получить токен
        </Button>
      </Box>
    </Stack>
  );
}
