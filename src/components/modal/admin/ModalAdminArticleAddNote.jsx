import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Stack, Textarea } from "@mantine/core";

import { addArticleNote } from "@/store/articleItem/slice";
import { validateNoteText } from "@/utils/validates";

import CustomModal from "@/components/modal/CustomModal";

export default function ModalAdminArticleAddNote({ modalVariant, articleId, open, close }) {
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

  const handleForm = (newNote) => {
    dispatch(addArticleNote({ articleId: articleId, newNote: newNote }));
  };

  const modalForm = (
    <Box>
      <form onSubmit={form.onSubmit(handleForm)}>
        <Stack gap="16px" align="center" px="sm">
          <Textarea
            {...form.getInputProps("text")}
            w="100%"
            rows={4}
            radius="md"
            size="lg"
            placeholder="Описание заметки"
          />

          <Button w="150px" type="submit">
            Создать
          </Button>
        </Stack>
      </form>
    </Box>
  );

  return (
    <CustomModal
      modalVariant={modalVariant}
      children={modalForm}
      size="lg"
      opened={open}
      onClose={close}
      title="Создать заметку"
    />
  );
}
