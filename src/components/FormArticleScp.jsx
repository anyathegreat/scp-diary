import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";

import { addArticleItem } from "../store/articleItem/slice";

export default function FormArticleScp({ handleCloseModal }) {
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

  const handleForm = (newArticle) => {
    dispatch(addArticleItem({ newArticle, cb: handleCloseModal }));
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleForm)} w="100%">
        <Group mt="10px" gap="10px" justify="center">
          <TextInput
            {...form.getInputProps("title")}
            withAsterisk
            size="md"
            w="500px"
            radius="md"
            placeholder="Введите название статьи. Вся настройка статьи будет внутри"
          />

          <Button type="submit">Создать</Button>
        </Group>
      </form>
    </Box>
  );
}
