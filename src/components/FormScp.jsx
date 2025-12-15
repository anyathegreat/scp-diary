import { Button, Group, Paper, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";

import { addScpItem } from "../store/scpItem/slice";

export default function FormScp() {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      "scp-number": "",
      title: "",
      description: "",
    },

    validate: {
      "scp-number": (value) => {
        return !value.trim() ? "Номер SCP обязателен" : !/^\d{3}$/i.test(value.trim()) ? "Формат: XXX" : null;
      },

      title: (value) => {
        return !value.trim() ? "Название обязательно" : null;
      },
    },
  });

  const handleForm = (values) => {
    dispatch(addScpItem(values));
  };

  return (
    <form onSubmit={form.onSubmit(handleForm)}>
      <Paper w="800px" radius="md" p="md" withBorder>
        <Title order={2} ta="center">
          Добавте SCP объект в базу данных
        </Title>
        <Stack mt="sm" gap="md">
          <TextInput
            {...form.getInputProps("scp-number")}
            withAsterisk
            label="Номер SCP:"
            placeholder="682"
            error={form.errors["scp-number"]}
          />

          <TextInput
            {...form.getInputProps("title")}
            withAsterisk
            label="Имя:"
            placeholder="Токсичная ящерица"
            error={form.errors.title}
          />

          <Textarea
            {...form.getInputProps("description")}
            withAsterisk
            label="Описание:"
            radius="md"
            placeholder="Напишите описание объекта"
            error={form.errors.description}
          />

          <Group justify="center" gap="sm">
            <Button type="submit">Save</Button>
            <Button onClick={form.reset}>Clean</Button>
          </Group>
        </Stack>
      </Paper>
    </form>
  );
}
