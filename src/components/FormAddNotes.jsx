import { useDispatch } from "react-redux";
import { Box, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

import { addNotes } from "../store/articleItem/slice";

export default function FormNotes({ articleId }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      text: "",
    },

    validate: {
      text: (value) => {
        return !value.trim() ? "Введите описание" : null;
      },
    },
  });

  const handleForm = (formFields) => {
    dispatch(addNotes({ articleId: articleId, newNote: formFields }));
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
        <Group mt="10px" gap="18px" justify="center">
          <Button type="submit" color="brown.0">
            Сохранить
          </Button>
        </Group>
      </form>
    </Box>
  );
}
