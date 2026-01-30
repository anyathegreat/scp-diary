import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Select, Title } from "@mantine/core";

import { getCategorys } from "../../store/categoryList/slice";
import { addArticleCategory } from "../../store/articleItem/slice";

export default function FormArticleAddCategory({ articleId, closeModal }) {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList.list);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      categoryId: "",
    },
  });

  const handleForm = (value) => {
    dispatch(addArticleCategory({ body: { article_id: articleId, category_id: value.categoryId }, cb: closeModal }));
  };

  const categoryOptions = categoryList.map((item) => ({
    value: item.categoryId.toString(),
    label: item.name,
  }));

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  return (
    <Box p="6px" bd="4px solid brown.0" bdrs="20px">
      <Title order={3} mb="10px" ta="center">
        Привязать категорию к статье
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
