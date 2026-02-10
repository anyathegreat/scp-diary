import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack, Title, Group, Button, Text, Divider, Tabs, Typography, Modal, Flex } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

import { getArticleItem } from "../store/articleItem/slice";

import ArticleNotes from "../components/ArticleNotes";
import ModalArticleEditScp from "../components/modal/ModalArticleEditScp";
import ModalArticleEditCategory from "../components/modal/ModalArticleEditCategory";
import ModalArticleUpdateTitle from "../components/modal/ModalArticleUpdateTitle";

export default function ArticleDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const article = useSelector((state) => state.articleItem.item);
  // const { loading } = useSelector((state) => state.articleItem);

  const [modalAddScp, setModalAddScp] = useState(false);
  const [modalAddCategory, setModalAddCategory] = useState(false);
  const [modalUpdateTitleArticle, setModalUpdateTitleArticle] = useState(false);

  const handleModalScp = () => {
    setModalAddScp((prev) => !prev);
  };

  const handleModalCategory = () => {
    setModalAddCategory((prev) => !prev);
  };

  const handleModalTitleArticle = () => {
    setModalUpdateTitleArticle((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getArticleItem(id));
  }, [dispatch, id]);

  const articleItem = article[0] || null;
  const creatures = articleItem?.creatures?.length > 0 ? articleItem?.creatures : null;
  const categories = articleItem?.categories?.length > 0 ? articleItem?.categories : null;

  // if (loading) {
  //   return <Skeleton height={100} w="70%" />;
  // }

  return (
    <Box>
      {articleItem && (
        <Box>
          <Stack w="100%" gap="sm" bd="3px solid beige.8" p="lg" bdrs="4px">
            <Flex wrap="wrap" gap="md" align="center" justify={{ base: "center", xs: "space-between" }}>
              <Title>{articleItem.title}</Title>

              <Button onClick={handleModalTitleArticle}>
                <IconEdit />
              </Button>
            </Flex>

            <Divider size="md" color="beige.8" />

            <Flex wrap="wrap" gap="md" align="center" justify={{ base: "center", xs: "space-between" }}>
              {categories && (
                <Group gap="sm">
                  {categories.map((item) => {
                    return (
                      <Box
                        key={`categories-${item.id}`}
                        bg="brown.0"
                        px="10px"
                        py="6px"
                        bdrs="4px"
                        bd="2px solid brown.4"
                      >
                        <Text c="beige.0" fz="20" fw="600">
                          {`#${item.name}`}
                        </Text>
                      </Box>
                    );
                  })}
                </Group>
              )}

              {!categories && <Text fz="20px">В этой статье нету категорий</Text>}

              <Button onClick={handleModalCategory}>
                <IconEdit />
              </Button>
            </Flex>
          </Stack>

          <Box mt="md" bd="3px solid beige.8" p="md" bdrs="4px">
            <Flex wrap="wrap" gap="md" align="center" justify={{ base: "center", xs: "space-between" }}>
              <Title order={3}>Scp объекты привязанные к статье:</Title>

              <Button onClick={handleModalScp}>
                <IconEdit />
              </Button>
            </Flex>

            {creatures && (
              <Tabs defaultValue="" allowTabDeactivation mt="20px">
                <Tabs.List>
                  {creatures.map((item) => {
                    return (
                      <Tabs.Tab key={`tabScp-${item.id}`} value={item["scp_number"]}>
                        {item.title}
                      </Tabs.Tab>
                    );
                  })}
                </Tabs.List>

                {creatures.map((item) => {
                  return (
                    <Tabs.Panel mt="2px" key={`tabScp-${item.id}`} value={item["scp_number"]}>
                      <Typography>
                        <Title order={3}>{`Scp-${item["scp_number"]} - ${item.title}`}</Title>
                        <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                      </Typography>
                    </Tabs.Panel>
                  );
                })}
              </Tabs>
            )}
          </Box>

          <ArticleNotes article={article} articleId={id} />

          <Box>
            {modalUpdateTitleArticle && (
              <ModalArticleUpdateTitle
                modalVariant="desktop"
                open={modalUpdateTitleArticle}
                close={handleModalTitleArticle}
                articleId={id}
              />
            )}
            {modalUpdateTitleArticle && (
              <ModalArticleUpdateTitle
                modalVariant="mobile"
                open={modalUpdateTitleArticle}
                close={handleModalTitleArticle}
                articleId={id}
              />
            )}
          </Box>

          <Box>
            {modalAddScp && (
              <ModalArticleEditScp
                modalVariant="desktop"
                open={modalAddScp}
                close={handleModalScp}
                article={articleItem}
              />
            )}

            {modalAddScp && (
              <ModalArticleEditScp
                modalVariant="mobile"
                open={modalAddScp}
                close={handleModalScp}
                article={articleItem}
              />
            )}
          </Box>

          <Box>
            {modalAddCategory && (
              <ModalArticleEditCategory
                modalVariant="desktop"
                open={modalAddCategory}
                close={handleModalCategory}
                article={articleItem}
              />
            )}

            {modalAddCategory && (
              <ModalArticleEditCategory
                modalVariant="mobile"
                open={modalAddCategory}
                close={handleModalCategory}
                article={articleItem}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
