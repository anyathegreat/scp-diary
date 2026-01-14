import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Textarea } from "@mantine/core";

import { updateNote } from "../store/articleItem/slice";

export default function FormUpdateNotes({ articleId, noteEdit }) {
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

  const handleForm = (values) => {
    dispatch(updateNote({ articleId: articleId, noteId: noteEdit.uid, updatedNote: values }));
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleForm)}>
        <Textarea
          {...form.getInputProps("text")}
          size="md"
          radius="md"
          rows={3}
          placeholder="Введите описание статьи"
        />

        <Box w="100% " align="center" mt="10px">
          <Button type="submit" color="brown.0">
            Сохранить
          </Button>
        </Box>
      </form>
    </Box>
  );
}
