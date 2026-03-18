import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";

import { updateArticleItemTitle } from "@/store/articleItem/slice";
import { validateArticleTitle } from "@/utils/validates";

import CustomModal from "@/components/modal/CustomModal";

export default function ModalArticleUpdateTitle({ modalVariant, articleId, open, close }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },

    validate: {
      title: validateArticleTitle,
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
    <CustomModal
      modalVariant={modalVariant}
      children={modalForm}
      title="Редактировать название статьи"
      opened={open}
      onClose={close}
    />
  );
}
