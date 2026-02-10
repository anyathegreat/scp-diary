import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Group, TextInput } from "@mantine/core";

import { addCategoryItem } from "../../store/categoryItem/slice";

import CustomModal from "./CustomModal";

export default function ModalAddCategory({ modalVariant, open, close }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      slug: "",
    },

    validate: {
      name: (value) => {
        return !value.trim() ? "Название статьи обязательно" : null;
      },

      slug: (value) => {
        if (!value.trim()) return "Slug обязателен";
        if (!/^[a-z0-9]+$/.test(value)) {
          return "Slug должен быть маленькими буквами";
        }

        return null;
      },
    },
  });

  const handleForm = (value) => {
    dispatch(addCategoryItem({ body: { name: value.name, slug: value.slug }, cb: close }));
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
          <Button type="submit">Создать</Button>
        </Box>
      </form>
    </Box>
  );

  return (
    <CustomModal
      modalVariant={modalVariant}
      children={modalForm}
      opened={open}
      onClose={close}
      title="Создание категории"
    />
  );
}
