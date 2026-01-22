import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";

import { getScps } from "../store/scpList/slice";
import { Box, Button, Select } from "@mantine/core";
import { updateArticleScp } from "../store/articleItem/slice";

export default function FormArticleAddScp({ articleId }) {
  const dispatch = useDispatch();

  const scpList = useSelector((state) => state.scpList.list);
  // const { loading } = useSelector((state) => state.scpList);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      scpId: "",
    },
  });

  const handleForm = (value) => {
    dispatch(updateArticleScp({ creature_id: value.scpId, article_id: articleId }));
  };

  useEffect(() => {
    dispatch(getScps());
  }, [dispatch]);

  const scpOptions = scpList.map((item) => ({
    value: item.scpId.toString(),
    label: `Scp-${item.scpNumber}-${item.title}`,
  }));

  return (
    <Box p="6px">
      <form onSubmit={form.onSubmit(handleForm)}>
        <Select size="md" data={scpOptions} searchable {...form.getInputProps("scpId")} />

        <Box ta="center" mt="20px">
          <Button type="submit">Сохранить</Button>
        </Box>
      </form>
    </Box>
  );
}
