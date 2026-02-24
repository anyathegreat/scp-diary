import { Box, Button, Group, TextInput } from "@mantine/core";

import CustomModal from "../CustomModal";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { addArticleItem } from "../../../store/articleItem/slice";

export default function ModalAdminAddArticle({ modalVariant, open, close }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },

    validate: {
      title: (value) => {
        return !value.trim() ? "Введите название" : null;
      },
    },
  });

  const handleForm = (newArticle) => {
    dispatch(addArticleItem({ newArticle, cb: close }));
  };

  const modalForm = (
    <Box>
      <form onSubmit={form.onSubmit(handleForm)}>
        <Group gap="10px" justify="center">
          <TextInput
            {...form.getInputProps("title")}
            withAsterisk
            size="md"
            w="500px"
            radius="md"
            placeholder="Введите название статьи"
          />

          <Button type="submit">Создать</Button>
        </Group>
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
      title="Создание статьи"
    ></CustomModal>
  );
}
