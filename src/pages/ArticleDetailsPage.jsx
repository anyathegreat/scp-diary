import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { Box, Card, Grid, Image, Skeleton, Stack, Text, Title } from "@mantine/core";

import { getArticleItem } from "../store/articleItem/slice";

import NotesArticleScp from "../components/NotesArticleScp";

export default function ArticleDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const article = useSelector((state) => state.articleItem.item);
  const { loading } = useSelector((state) => state.articleItem);

  useEffect(() => {
    dispatch(getArticleItem(id));
  }, [dispatch, id]);

  const creatures = article[0]?.creatures || [];

  if (loading) {
    return <Skeleton height={100} w="70%" />;
  }

  return (
    <Stack>
      {creatures.length > 0 && (
        <Box align="center">
          <Title order={3}>Scp объекты которые используются в статье:</Title>

          <Grid w="60%" mt="20px" gap="20px" justify="center">
            {creatures.map((item) => {
              return (
                <Grid.Col span={4} key={`articleScp-${item.id}`}>
                  <Card
                    w="200px"
                    padding="md"
                    radius="md"
                    withBorder
                    component={Link}
                    to={`/scp/${item.id}`}
                    bg="beige.4"
                  >
                    <Card.Section>
                      <Image src={item.image}></Image>
                    </Card.Section>

                    <Text mt="6px">{item.title}</Text>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        </Box>
      )}

      <NotesArticleScp article={article} articleId={id} />
    </Stack>
  );
}
