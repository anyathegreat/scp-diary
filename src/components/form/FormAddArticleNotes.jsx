import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Group, Textarea } from "@mantine/core";

import { addArticleNote } from "../../store/articleItem/slice";

import { validateNoteText } from "../../utils/validates";

export default function FormAddArticleNote({ articleId }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      text: "",
    },

    validate: {
      text: validateNoteText,
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
