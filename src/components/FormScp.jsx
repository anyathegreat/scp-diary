import { Box, Button, FileButton, Group, Paper, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { validateImageFile } from "../utils/fileValidation";
import { toast } from "react-toastify";

import { addScpItem } from "../store/scpItem/slice";

export default function FormScp() {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

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
    },
  });

  const handleFileChange = async (file) => {
    if (!file) {
      setFile(null);
      form.setFieldValue("image", null);
      return;
    }

    const error = await validateImageFile(file);

    if (error) {
      setFile(null);
      form.setFieldValue("image", null);
      toast.error(error);
    } else {
      setFile(file);
      form.setFieldValue("image", file);
    }
  };

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
    setFile(null);
  };

  return (
    <form onSubmit={form.onSubmit(handleForm)}>
      <Title order={2} ta="center">
        Добавте SCP объект в базу данных
      </Title>

      <Paper w="800px" radius="md" mt="md" p="md" withBorder>
        <Stack mt="sm" gap="md">
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

          <Group justify="space-between">
            <Box w="60%">
              <Group>
                <FileButton onChange={handleFileChange} accept="image/png,image/jpeg,image/gif,image/WebP" name="image">
                  {(props) => <Button {...props}>{file ? "Заменить изображение" : "Загрузить изображение"}</Button>}
                </FileButton>

                {file && (
                  <Button
                    color="red"
                    onClick={() => {
                      setFile(null);
                      form.setFieldValue("image", null);
                    }}
                  >
                    Удалить файл
                  </Button>
                )}
              </Group>

              {file && <Box mt="10px">{file.name}</Box>}
            </Box>

            <Group justify="center" gap="sm">
              <Button type="submit">Сохранить</Button>
              <Button onClick={handleReset}>Очистить</Button>
            </Group>
          </Group>
        </Stack>
      </Paper>
    </form>
  );
}
