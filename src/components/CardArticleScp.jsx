import { Box, Button, Card, Divider, Group, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { deleteArticleItem } from "../store/articleItem/slice";

export default function ArticleCard({ article }) {
  const dispatch = useDispatch();

  const categories = article?.categories.length != 0 ? article.categories : null;

  const handleDeleteArticle = (articleId) => {
    dispatch(deleteArticleItem(articleId));
  };

  return (
    <Card w="70%" padding="md" radius="md" withBorder bg="beige.4">
      <Group justify="space-between">
        <Title order={3} c="brown.3">
          {article.title}
        </Title>

        <Group justify="end" gap="10px" w="20%">
          <Button size="xs" component={Link} to={String(article.articleId)} color="brown.0">
            <IconEdit />
          </Button>
          <Button size="xs" color="#961818" onClick={() => handleDeleteArticle(article.articleId)}>
            <IconTrash />
          </Button>
        </Group>
      </Group>

      {categories && (
        <Box>
          <Divider mt="6px" color="brown.4" size="2px" />

          <Group gap="8px" mt="6px">
            {categories.map((item) => {
              return (
                <Box
                  key={`categories-${item.id}`}
                  bg="brown.0"
                  bdrs="10px"
                  py="2px"
                  px="10px"
                  c="beige.2"
                >{`#${item.name}`}</Box>
              );
            })}
          </Group>
        </Box>
      )}
    </Card>
  );
}
