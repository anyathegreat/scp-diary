import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Group, TextInput } from "@mantine/core";

import { addArticleItem } from "@/store/articleItem/slice";
import { validateArticleTitle } from "@/utils/validates";

import CustomModal from "@/components/modal/CustomModal";

export default function ModalAdminAddArticle({ modalVariant, open, close }) {
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
    />
  );
}
