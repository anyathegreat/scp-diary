import { Button, Stack } from "@mantine/core";
import ScpForm from "../components/ScpForm";

import { handleTimeLogin } from "../testItem";

export default function HomePage() {
  return (
    <Stack align="center">
      <ScpForm />
      <Button onClick={() => handleTimeLogin()}>Получить токен</Button>
    </Stack>
  );
}
