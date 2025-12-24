import { Box, Button, Stack } from "@mantine/core";

import FormScp from "../components/FormListScp";

import { handleTimeLogin } from "../testItem";

export default function ScpFormPage() {
  return (
    <Stack align="center">
      <FormScp />
      <Button onClick={() => handleTimeLogin()}>Получить токен</Button>
    </Stack>
  );
}
