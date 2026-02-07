import { Box, Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { updateArticleItemTitle } from "../../store/articleItem/slice";
import ModalTypeVisible from "./ModalTypeVisible";

export default function ModalArticleUpdateTitle({ typeVisible, articleId, open, close }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },

    validate: {
      title: (value) => {
        return !value.trim() ? "Название статьи обязательно" : null;
      },
    },
  });

  const handleForm = (value) => {
    dispatch(
      updateArticleItemTitle({
        body: { articleId: articleId, updateArticle: { title: value.title } },
        cb: close,
      }),
    );
  };

  const modalForm = (
    <Box>
      <form onSubmit={form.onSubmit(handleForm)} w="100%">
        <Group mt="10px" gap="10px" justify="center">
          <TextInput
            {...form.getInputProps("title")}
            withAsterisk
            size="md"
            w="500px"
            radius="md"
            placeholder="Введите название статьи"
          />

          <Button type="submit">Сохранить</Button>
        </Group>
      </form>
    </Box>
  );

  return (
    <ModalTypeVisible
      typeVisible={typeVisible}
      children={modalForm}
      title="Редактировать название статьи"
      open={open}
      close={close}
    />
  );
}
