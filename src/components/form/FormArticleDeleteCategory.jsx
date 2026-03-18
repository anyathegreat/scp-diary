import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Select, Title } from "@mantine/core";

import { deleteArticleCategory } from "@/store/articleItem/slice";

export default function FormArticleDeleteCategory({ article, closeModal }) {
  const dispatch = useDispatch();

  const categoryList = article?.categories || [];

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      categoryId: "",
    },
  });

  const handleForm = (value) => {
    dispatch(
      deleteArticleCategory({ body: { category_id: value.categoryId, article_id: article.articleId }, cb: closeModal }),
    );
  };

  const categoryOptions = categoryList.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  return (
    <Box p="md" bd="3px solid brown.4" bdrs="4px">
      <Title order={3} mb="10px" ta="center">
        Отвязать категорию
      </Title>

      <form onSubmit={form.onSubmit(handleForm)}>
        <Select size="md" data={categoryOptions} searchable {...form.getInputProps("categoryId")} />

        <Box ta="center" mt="20px">
          <Button type="submit">Сохранить</Button>
        </Box>
      </form>
    </Box>
  );
}
