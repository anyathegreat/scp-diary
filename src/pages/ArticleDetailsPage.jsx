import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Accordion, Box, Skeleton, Stack, Title, Group, Button, Flex, Text } from "@mantine/core";
import { IconBiohazardFilled } from "@tabler/icons-react";

import { getArticleItem } from "../store/articleItem/slice";

import NotesArticleScp from "../components/NotesArticleScp";
import ModalArticleScp from "../components/modal/ModalArticleScp";
import ModalArticleCategory from "../components/modal/ModalArticleCategory";

export default function ArticleDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const article = useSelector((state) => state.articleItem.item);
  const { loading } = useSelector((state) => state.articleItem);

  const [openAddScp, setOpenAddScp] = useState(false);
  const [openModalCategory, setOpenModalCategory] = useState(false);

  useEffect(() => {
    dispatch(getArticleItem(id));
  }, [dispatch, id]);

  const articleItem = article[0] || null;
  const creatures = articleItem?.creatures || null;
  const categories = articleItem?.categories || null;

  if (loading) {
    return <Skeleton height={100} w="70%" />;
  }

  const handleOpenModalScp = () => {
    setOpenAddScp(true);
  };

  const handleCloseModalScp = () => {
    setOpenAddScp(false);
  };

  const handleOpenModalCategory = () => {
    setOpenModalCategory(true);
  };

  const handleCloseModalCategory = () => {
    setOpenModalCategory(false);
  };

  return (
    <>
      {articleItem && (
        <Box ta="center">
          <Box align="center" mb="md">
            <Flex w="80%" wrap="wrap" gap="sm" justify={{ base: "center", sm: "space-between" }}>
              <Title>{articleItem.title}</Title>

              {categories && (
                <Flex wrap="wrap" gap="sm" justify={{ base: "center", sm: "end" }}>
                  {categories.map((item) => {
                    return (
                      <Box key={`category-${item.id}`} bg="brown.4" p="10px" bdrs="12px">
                        <Text fz="16px" fw={700} c="beige.0">
                          {`# ${item.name}`}
                        </Text>
                      </Box>
                    );
                  })}
                </Flex>
              )}
            </Flex>
          </Box>

          {creatures && (
            <Box align="center">
              <Stack w="80%" gap="sm">
                <Group gap="sm" justify="center">
                  <Button onClick={handleOpenModalScp}>Отредактировать Scp</Button>
                  <Button onClick={handleOpenModalCategory}>Отредактировать категорию</Button>
                </Group>

                <Stack>
                  <Title order={3}>Scp объекты которые используются в статье:</Title>

                  <Accordion>
                    {creatures.map((item) => {
                      return (
                        <Accordion.Item key={item.id} value={item.title}>
                          <Accordion.Control
                            icon={<IconBiohazardFilled />}
                          >{`Scp-${item["scp_number"]} - ${item.title}`}</Accordion.Control>
                          <Accordion.Panel>{item.description}</Accordion.Panel>
                        </Accordion.Item>
                      );
                    })}
                  </Accordion>
                </Stack>
              </Stack>
            </Box>
          )}

          {!creatures && (
            <Group gap="sm" justify="center">
              <Button onClick={handleOpenModalScp}>Отредактировать Scp</Button>
              <Button onClick={handleOpenModalCategory}>Отредактировать категории</Button>
            </Group>
          )}

          <NotesArticleScp article={article} articleId={id} />

          {openAddScp && (
            <ModalArticleScp open={handleOpenModalScp} close={handleCloseModalScp} article={articleItem} />
          )}

          {openModalCategory && (
            <ModalArticleCategory open={openModalCategory} close={handleCloseModalCategory} article={articleItem} />
          )}
        </Box>
      )}
    </>
  );
}
