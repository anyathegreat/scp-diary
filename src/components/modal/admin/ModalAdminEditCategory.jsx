import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Group, TextInput } from "@mantine/core";

import { updateCategoryItem } from "@/store/categoryItem/slice";
import { validateCategorySlug, validateCategoryTitle } from "@/helpers/validates";

import CustomModal from "@/components/modal/CustomModal";

export default function ModalAdminEditCategory({ editCategory, modalVariant, open, close }) {
  const dispatch = useDispatch();

  console.log(editCategory);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: editCategory.name,
      slug: editCategory.slug,
    },

    validate: {
      name: validateCategoryTitle,
      slug: validateCategorySlug,
    },
  });

  const handleForm = (newCategory) => {
    dispatch(
      updateCategoryItem({
        body: {
          categoryId: editCategory.categoryId,
          updateCategory: { name: newCategory.name, slug: newCategory.slug },
        },
        cb: close,
      }),
    );
  };

  const modalForm = (
    <Box>
      <form onSubmit={form.onSubmit(handleForm)} w="100%">
        <Group mt="10px" gap="10px" justify="center">
          <TextInput
            {...form.getInputProps("name")}
            withAsterisk
            size="md"
            w="500px"
            radius="md"
            placeholder="Введите название категории"
          />
          <TextInput
            {...form.getInputProps("slug")}
            withAsterisk
            size="md"
            w="500px"
            radius="md"
            placeholder="Введите slug для категории"
          />
        </Group>

        <Box align="center" mt="10px">
          <Button type="submit">Сохранить</Button>
        </Box>
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
      title="Редактировать категорию"
    />
  );
}
