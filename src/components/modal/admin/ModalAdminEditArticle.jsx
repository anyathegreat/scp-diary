import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";

import { Link } from "react-router";
import { updateArticleItemTitle } from "../../../store/articleItem/slice";
import { getArticles } from "../../../store/articleList/slice";

import CustomModal from "../CustomModal";

export default function ModalAdminEditArticle({ modalVariant, article, open, close }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: article.title,
    },
  });

  const handleForm = (value) => {
    dispatch(
      updateArticleItemTitle({
        body: { articleId: article.articleId, updateArticle: { title: value.title } },
        cb: close,
      }),
    );

    dispatch(getArticles());
  };

  const modalForm = (
    <Box>
      <form onSubmit={form.onSubmit(handleForm)}>
        <Group gap="16px" justify="center" px="sm">
          <Group w="100%" justify="space-between">
            <Text fz="20px" fw="600">
              Название статьи:
            </Text>

            <TextInput
              {...form.getInputProps("title")}
              withAsterisk
              w="300px"
              size="md"
              radius="md"
              placeholder="Введите название статьи"
            />
          </Group>

          <Group w="100%" justify="space-between">
            <Text fz="20px" fw="600">
              Изменить записи:
            </Text>

            <Button component={Link} to={`notes/${article.articleId}`}>
              Заметки
            </Button>
          </Group>

          <Group w="100%" justify="space-between">
            <Text fz="20px" fw="600">
              Изменить привязанные категории:
            </Text>

            <Button component={Link} to={`categories/${article.articleId}`}>
              Категории
            </Button>
          </Group>

          <Group w="100%" justify="space-between">
            <Text fz="20px" fw="600">
              Изменить привязанных scp:
            </Text>

            <Button component={Link} to={`scps/${article.articleId}`}>
              Scp объекты
            </Button>
          </Group>

          <Button type="submit">Редактировать</Button>
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
      title={`Редакция статьи: ${article.title}`}
    />
  );
}
