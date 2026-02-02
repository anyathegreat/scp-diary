import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Box, Button, Select, Title } from "@mantine/core";

import { deleteArticleScp } from "../../store/articleItem/slice";

export default function FormArticleDeleteScp({ article, closeModal }) {
  const dispatch = useDispatch();

  const creatures = article?.creatures || [];

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      scpId: "",
    },
  });

  const handleForm = (value) => {
    dispatch(deleteArticleScp({ body: { creature_id: value.scpId, article_id: article.articleId }, cb: closeModal }));
  };

  const scpOptions = creatures.map((item) => ({
    value: item.id.toString(),
    label: `Scp-${item["scp_number"]}-${item.title}`,
  }));

  return (
    <Box p="md" bd="3px solid brown.4" bdrs="4px">
      <Title order={3} mb="10px" ta="center">
        Отвязать scp от статьи
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
