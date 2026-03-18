import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, FileInput, Flex, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { IconPolaroid } from "@tabler/icons-react";

import { addScpItem } from "@/store/scpItem/slice";
import { fileToBase64 } from "@/helpers/fileToBase64";
import { validateAddScpImage, validateScpNumber, validateScpTitle } from "@/helpers/validates";

import CustomModal from "@/components/modal/CustomModal";

export default function ModalAdminAddScp({ modalVariant, open, close }) {
  const dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      number: "",
      title: "",
      description: "",
      image: null,
    },

    validate: {
      number: validateScpNumber,
      title: validateScpTitle,
      image: validateAddScpImage,
    },
  });

  const handleForm = async (values) => {
    const newScp = {
      title: values.title,
      scp_number: values.number,
      description: values.description,
      image: null,
    };

    if (values.image) {
      try {
        const imageBase64 = await fileToBase64(values.image);
        newScp.image = imageBase64;
      } catch (error) {
        console.error(error.message);
        return;
      }
    }

    dispatch(addScpItem({ newScp: newScp, cb: close }));
  };

  const modalForm = (
    <Box>
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
          <Box>
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

          <Button type="submit">Сохранить</Button>
        </Flex>
      </form>
    </Box>
  );

  return (
    <CustomModal
      modalVariant={modalVariant}
      children={modalForm}
      opened={open}
      onClose={close}
      size="lg"
      title="Добавить SCP объект"
    />
  );
}
