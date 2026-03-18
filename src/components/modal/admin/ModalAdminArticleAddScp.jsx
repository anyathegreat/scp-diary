import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Select } from "@mantine/core";

import { addArticleScp } from "@/store/articleItem/slice";
import { getScps } from "@/store/scpList/slice";

import CustomModal from "@/components/modal/CustomModal";

export default function ModalAdminArticleAddScp({ modalVariant, articleId, open, close }) {
  const dispatch = useDispatch();

  const scpList = useSelector((state) => state.scpList.list);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      scpId: "",
    },
  });

  const handleForm = (value) => {
    dispatch(addArticleScp({ body: { creature_id: value.scpId, article_id: articleId }, cb: close }));
  };

  const scpOptions = scpList.map((item) => ({
    value: item.scpId.toString(),
    label: `Scp-${item.scpNumber}-${item.title}`,
  }));

  useEffect(() => {
    dispatch(getScps());
  }, [dispatch]);

  const modalForm = (
    <Box>
      <form onSubmit={form.onSubmit(handleForm)}>
        <Select size="md" data={scpOptions} searchable {...form.getInputProps("scpId")} />

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
      title="Привязать scp"
    />
  );
}
