import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { updateArticleItemTitle } from "../../store/articleItem/slice";

export default function FormArticleUpdateTitle({ articleId, close }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
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
            placeholder="Введите название статьи"
          />

          <Button type="submit">Сохранить</Button>
        </Group>
      </form>
    </Box>
  );
}
