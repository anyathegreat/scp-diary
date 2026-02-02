import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Select, Title } from "@mantine/core";

import { getScps } from "../../store/scpList/slice";
import { addArticleScp } from "../../store/articleItem/slice";

export default function FormArticleAddScp({ articleId, closeModal }) {
  const dispatch = useDispatch();

  const scpList = useSelector((state) => state.scpList.list);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      scpId: "",
    },
  });

  const handleForm = (value) => {
    dispatch(addArticleScp({ body: { creature_id: value.scpId, article_id: articleId }, cb: closeModal }));
  };

  useEffect(() => {
    dispatch(getScps());
  }, [dispatch]);

  const scpOptions = scpList.map((item) => ({
    value: item.scpId.toString(),
    label: `Scp-${item.scpNumber}-${item.title}`,
  }));

  return (
    <Box p="md" bd="3px solid brown.4" bdrs="4px">
      <Title order={3} mb="10px" ta="center">
        Привязать scp к статье
      </Title>

      <form onSubmit={form.onSubmit(handleForm)}>
        <Select size="md" data={scpOptions} searchable {...form.getInputProps("scpId")} />

        <Box ta="center" mt="20px">
          <Button type="submit">Сохранить</Button>
        </Box>
      </form>
    </Box>
  );
}
