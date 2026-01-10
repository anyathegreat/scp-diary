import { Box, Button, FileInput, Flex, Group, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";

import { addScpItem } from "../store/scpItem/slice";
import { IconPolaroid, IconTrash } from "@tabler/icons-react";

export default function FormScp() {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      number: "",
      title: "",
      image: null,
      description: "",
    },

    validate: {
      number: (value) => {
        return !value.trim() ? "Номер объекта обязателен" : null;
      },

      title: (value) => {
        return !value.trim() ? "Название обязательно" : null;
      },

      image: (value) => {
        if (!value) return "Изображение обязательно";
        if (!value.type.startsWith("image/")) return "Файл не является изображением";
        if (value.size > 5 * 1024 * 1024) return "Файл слишком большой (макс. 5MB)";

        return null;
      },
    },
  });

  const handleForm = (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("scp-number", values.number);
    if (values.description) formData.append("description", values.description);
    if (values.image) formData.append("image", values.image);

    dispatch(addScpItem(formData));
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Box maw={{ base: "100%", sm: "800px" }} w="100%">
      <Title order={2} ta="center">
        Добавте SCP объект в базу данных:
      </Title>

      <Flex w="100%" direction="column" mt="md" p="md" bd="1px solid #5f5d5d" bdrs="20px">
        <form onSubmit={form.onSubmit(handleForm)}>
          <Stack gap="8px">
            <TextInput
              {...form.getInputProps("number")}
              withAsterisk
              label="Номер SCP:"
              placeholder="682"
              error={form.errors.number}
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
          </Stack>

          <Group justify="space-between" mt="16px">
            <Box w={{ base: "100%", sm: "60%" }}>
              <Group w="100%" justify="center">
                <FileInput
                  {...form.getInputProps("image")}
                  accept="image/png,image/jpeg,image/gif,image/WebP"
                  name="image"
                  w="230px"
                  leftSection={<IconPolaroid />}
                  size="sm"
                  radius="md"
                  placeholder="Выберите картинку"
                  withAsterisk
                  clearable
                />

                {form.values.image && (
                  <Button
                    color="red"
                    onClick={() => {
                      form.setFieldValue("image", null);
                      form.clearFieldError("image");
                    }}
                  >
                    <IconTrash />
                  </Button>
                )}
              </Group>
            </Box>

            <Group w={{ base: "100%", sm: "30%" }} justify="center" gap="sm">
              <Button type="submit">Сохранить</Button>
              <Button onClick={handleReset}>Очистить</Button>
            </Group>
          </Group>
        </form>
      </Flex>
    </Box>
  );
}
