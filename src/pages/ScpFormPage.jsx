import { Button, Stack } from "@mantine/core";

import FormScp from "../components/FormScp";

import { handleTimeLogin } from "../testItem";

export default function ScpFormPage() {
  return (
    <Stack align="center">
      <FormScp />
      <Button onClick={() => handleTimeLogin()}>Получить токен</Button>
    </Stack>
  );
}
