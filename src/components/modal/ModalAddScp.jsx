import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, FileInput, Flex, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { IconPolaroid } from "@tabler/icons-react";

import { addScpItem } from "@/store/scpItem/slice";
import { validateAddScpImage, validateScpNumber, validateScpTitle } from "@/helpers/validates";

import CustomModal from "@/components/modal/CustomModal";

export default function ModalAddScp({ modalVariant, open, close }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      number: "",
      title: "",
      image: null,
      description: "",
    },

    validate: {
      number: validateScpNumber,
      title: validateScpTitle,
      image: validateAddScpImage,
    },
  });

  const handleForm = (values) => {
    // dispatch(addScpItem({ formData: formData, cb: close }));
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <CustomModal
      modalVariant={modalVariant}
      size="lg"
      title="Добавить SCP объект в базу данных"
      opened={open}
      onClose={close}
    >
      <Box maw={{ base: "100%", sm: "800px" }} w="100%" pr="20px" pl="20px">
        <form onSubmit={form.onSubmit(handleForm)}>
          <Stack gap="8px">
            <TextInput
              {...form.getInputProps("number")}
              withAsterisk
              size="md"
              label="Номер SCP:"
              placeholder="682"
              error={form.errors.number}
            />

            <TextInput
              {...form.getInputProps("title")}
              withAsterisk
              size="md"
              label="Имя:"
              placeholder="Токсичная ящерица"
              error={form.errors.title}
            />

            <Textarea
              {...form.getInputProps("description")}
              withAsterisk
              size="md"
              label="Описание:"
              radius="md"
              placeholder="Напишите описание объекта"
              error={form.errors.description}
            />
          </Stack>

          <Flex wrap="wrap" justify="space-between" align="start" mt="16px">
            <Box w={{ base: "100%", sm: "40%" }}>
              <Group w="100%" mb="sm" justify="center">
                <FileInput
                  {...form.getInputProps("image")}
                  accept="image/png,image/jpeg,image/gif,image/WebP"
                  name="image"
                  w="230px"
                  leftSection={<IconPolaroid />}
                  size="sm"
                  radius="md"
                  placeholder="Выберите картинку"
                  withAsterisk
                  clearable
                />
              </Group>
            </Box>

            <Group w={{ base: "100%", sm: "50%" }} justify="center" gap="sm" p="0px">
              <Button type="submit">Сохранить</Button>
              <Button onClick={handleReset}>Очистить</Button>
            </Group>
          </Flex>
        </form>
      </Box>
    </CustomModal>
  );
}
