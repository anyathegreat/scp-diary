import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { addCategoryItem } from "../../store/categoryItem/slice";

export default function FormAddCategory({ close }) {
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
        !value.trim() ? "Slug обязателен" : null;
      },
    },
  });

  const handleForm = (value) => {
    dispatch(addCategoryItem({ body: { name: value.name, slug: value.slug }, cb: close }));
  };

  return (
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
            pattern="^[a-z0-9]+$"
            placeholder="Введите slug для категории"
            error="slug должен быть маленькими буквами"
          />

          <Button type="submit">Создать</Button>
        </Group>
      </form>
    </Box>
  );
}
