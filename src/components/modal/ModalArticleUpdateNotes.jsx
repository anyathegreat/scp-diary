import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Textarea } from "@mantine/core";

import { updateNote } from "../../store/articleItem/slice";
import CustomModal from "./CustomModal";

export default function ModalArticleUpdateNotes({ modalVariant, articleId, noteEdit, open, close }) {
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

  const handleForm = (values) => {
    dispatch(updateNote({ articleId: articleId, noteId: noteEdit.uid, updatedNote: values }));
  };

  const modalForm = (
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
          <Button type="submit">Сохранить</Button>
        </Box>
      </form>
    </Box>
  );

  return (
    <CustomModal
      modalVariant={modalVariant}
      children={modalForm}
      opened={open}
      onClose={close}
      title="Редактировать заметку"
    />
  );
}
