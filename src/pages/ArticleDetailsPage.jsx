import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Box, Skeleton, Stack, Title, Group, Button, Text, Divider, Tabs, Typography, Modal } from "@mantine/core";

import { getArticleItem } from "../store/articleItem/slice";

import NotesArticleScp from "../components/NotesArticleScp";
import ModalArticleScp from "../components/modal/ModalArticleScp";
import ModalArticleCategory from "../components/modal/ModalArticleCategory";
import { IconEdit } from "@tabler/icons-react";
import FormArticleUpdateTitle from "../components/form/FormArticleUpdateTitle";

export default function ArticleDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const article = useSelector((state) => state.articleItem.item);
  // const { loading } = useSelector((state) => state.articleItem);

  const [openModalAddScp, setOpenModalAddScp] = useState(false);
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalTitleArticle, setOpenModalTitleArticle] = useState(false);

  const handleOpenModalScp = () => {
    setOpenModalAddScp(true);
  };

  const handleCloseModalScp = () => {
    setOpenModalAddScp(false);
  };

  const handleOpenModalCategory = () => {
    setOpenModalCategory(true);
  };

  const handleCloseModalCategory = () => {
    setOpenModalCategory(false);
  };

  const handleModalTitleArticle = () => {
    setOpenModalTitleArticle((prev) => !prev);
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
            <Group justify="space-between">
              <Title>{articleItem.title}</Title>

              <Button onClick={handleModalTitleArticle}>
                <IconEdit />
              </Button>
            </Group>

            <Divider size="md" color="beige.8" />

            <Group justify="space-between">
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

              <Button onClick={handleOpenModalCategory}>
                <IconEdit />
              </Button>
            </Group>
          </Stack>

          <Box mt="md" bd="3px solid beige.8" p="md" bdrs="4px">
            <Group justify="space-between">
              <Title order={3}>Scp объекты привязанные к статье:</Title>

              <Button onClick={handleOpenModalScp}>
                <IconEdit />
              </Button>
            </Group>

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
                    <Tabs.Panel key={`tabScp-${item.id}`} value={item["scp_number"]}>
                      <Typography>
                        <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                      </Typography>
                    </Tabs.Panel>
                  );
                })}
              </Tabs>
            )}
          </Box>

          <NotesArticleScp article={article} articleId={id} />

          {openModalTitleArticle && (
            <Modal
              size="lg"
              centered
              title="Редактировать название статьи"
              opened={openModalTitleArticle}
              onClose={handleModalTitleArticle}
            >
              <FormArticleUpdateTitle articleId={id} close={handleModalTitleArticle} />
            </Modal>
          )}

          {openModalAddScp && (
            <ModalArticleScp open={handleOpenModalScp} close={handleCloseModalScp} article={articleItem} />
          )}

          {openModalCategory && (
            <ModalArticleCategory
              open={handleOpenModalCategory}
              close={handleCloseModalCategory}
              article={articleItem}
            />
          )}
        </Box>
      )}
    </Box>
  );

  // return (
  //   <>
  //     {articleItem && (
  //       <Box ta="center">
  //         <Box align="center" mb="md">
  //           <Flex w="80%" wrap="wrap" gap="sm" justify={{ base: "center", sm: "space-between" }}>
  //             <Title>{articleItem.title}</Title>
  //             {categories && (
  //               <Flex wrap="wrap" gap="sm" justify={{ base: "center", sm: "end" }}>
  //                 {categories.map((item) => {
  //                   return (
  //                     <Box key={`category-${item.id}`} bg="brown.4" p="10px" bdrs="12px">
  //                       <Text fz="16px" fw={700} c="beige.0">
  //                         {`# ${item.name}`}
  //                       </Text>
  //                     </Box>
  //                   );
  //                 })}
  //               </Flex>
  //             )}
  //           </Flex>
  //         </Box>
  //         {creatures && (
  //           <Box align="center">
  //             <Stack w="80%" gap="sm">
  //               <Group gap="sm" justify="center">
  //                 <Button onClick={handleOpenModalScp}>Отредактировать Scp</Button>
  //                 <Button onClick={handleOpenModalCategory}>Отредактировать категорию</Button>
  //               </Group>
  //               <Stack>
  //                 <Title order={3}>Scp объекты которые используются в статье:</Title>
  //                 <Accordion>
  //                   {creatures.map((item) => {
  //                     return (
  //                       <Accordion.Item key={item.id} value={item.title}>
  //                         <Accordion.Control
  //                           icon={<IconBiohazardFilled />}
  //                         >{`Scp-${item["scp_number"]} - ${item.title}`}</Accordion.Control>
  //                         <Accordion.Panel>{item.description}</Accordion.Panel>
  //                       </Accordion.Item>
  //                     );
  //                   })}
  //                 </Accordion>
  //               </Stack>
  //             </Stack>
  //           </Box>
  //         )}
  //       </Box>
  //     )}
  //   </>
  // );
}
