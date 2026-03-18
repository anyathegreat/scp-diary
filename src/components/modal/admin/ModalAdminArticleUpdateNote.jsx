import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Textarea } from "@mantine/core";

import { updateNote } from "../../../store/articleItem/slice";

import { validateNoteText } from "../../../utils/validates";

import CustomModal from "../CustomModal";

export default function ModalAdminArticleUpdateNote({ articleId, noteEdit, modalVariant, open, close }) {
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

  const handleForm = (values) => {
    dispatch(updateNote({ body: { articleId: articleId, noteId: noteEdit.uid, updatedNote: values }, cb: close }));
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
