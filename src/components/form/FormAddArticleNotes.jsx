import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Group, Textarea } from "@mantine/core";

import { addArticleNote } from "../../store/articleItem/slice";

export default function FormAddArticleNote({ articleId }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      text: "",
    },

    validate: {
      text: (value) => {
        if (!value.trim()) return "Введите описание";
        if (value.trim().length < 40) return "Описание должно состоять минимум из 40 символов";
        return null;
      },
    },
  });

  const handleForm = (formFields) => {
    dispatch(addArticleNote({ articleId: articleId, newNote: formFields }));
  };

  return (
    <Box w="90%" mt="10px" p="10px">
      <form onSubmit={form.onSubmit(handleForm)}>
        <Textarea
          {...form.getInputProps("text")}
          rows={4}
          radius="md"
          size="lg"
          placeholder="Создание заметки: введите описание"
        />
        <Group mt="10px" justify="center">
          <Button type="submit">Сохранить</Button>
        </Group>
      </form>
    </Box>
  );
}
