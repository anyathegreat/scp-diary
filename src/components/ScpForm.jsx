import { Button, Group, Paper, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ScpForm() {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      "scp-number": "",
      title: "",
      description: "",
    },

    validate: {
      "scp-number": (value) => {
        return !value.trim() ? "Номер SCP обязателен" : !/^SCP-\d{3}$/i.test(value.trim()) ? "Формат: SCP-XXX" : null;
      },

      title: (value) => {
        return !value.trim() ? "Название обязательно" : null;
      },
    },
  });

  const handleForm = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleForm)}>
      <Paper w="800px" radius="md" p="md" withBorder>
        <Stack gap="md">
          <TextInput
            {...form.getInputProps("scp-number")}
            withAsterisk
            label="Номер SCP:"
            placeholder="SCP-682"
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
