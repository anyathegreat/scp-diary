import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Select } from "@mantine/core";

import { addArticleCategory } from "../../../store/articleItem/slice";
import { getCategories } from "../../../store/categoryList/slice";

import CustomModal from "../CustomModal";

export default function ModalAdminArticleAddCategory({ modalVariant, articleId, open, close }) {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList.list);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      categoryId: "",
    },
  });

  const handleForm = (value) => {
    dispatch(addArticleCategory({ body: { article_id: articleId, category_id: value.categoryId }, cb: close }));
  };

  const categoryOptions = categoryList.map((item) => ({
    value: item.categoryId.toString(),
    label: item.name,
  }));

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const modalForm = (
    <Box>
      <form onSubmit={form.onSubmit(handleForm)}>
        <Select size="md" data={categoryOptions} searchable {...form.getInputProps("categoryId")} />

        <Box ta="center" mt="20px">
          <Button type="submit">Сохранить</Button>
        </Box>
      </form>
    </Box>
  );

  return (
    <CustomModal
      modalVariant={modalVariant}
      removeScrollProps={{ enabled: false }}
      children={modalForm}
      size="lg"
      opened={open}
      onClose={close}
      title="Привязать категорию"
    />
  );
}
