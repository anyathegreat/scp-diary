import { Button } from "@mantine/core";
import { handleTimeLogin } from "../testItem";

export default function HomePage() {
  return <Button onClick={() => handleTimeLogin()}>Получить токен</Button>;
}
