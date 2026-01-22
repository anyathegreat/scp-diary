import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Accordion, Box, Skeleton, Stack, Title, Group, Button, Divider, Modal } from "@mantine/core";

import { getArticleItem } from "../store/articleItem/slice";

import NotesArticleScp from "../components/NotesArticleScp";
import { IconBiohazardFilled } from "@tabler/icons-react";
import FormArticleAddScp from "../components/FormArticleAddScp";

export default function ArticleDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const article = useSelector((state) => state.articleItem.item);
  const { loading } = useSelector((state) => state.articleItem);

  const [openAddScp, setOpenAddScp] = useState(false);
  // const [openModalTag, setModalTeg] = useState(false);

  useEffect(() => {
    dispatch(getArticleItem(id));
  }, [dispatch, id]);

  const creatures = article[0]?.creatures || [];

  if (loading) {
    return <Skeleton height={100} w="70%" />;
  }

  const handleOpenModal = () => {
    setOpenAddScp(true);
  };

  const handleCloseModal = () => {
    setOpenAddScp(false);
  };

  return (
    <Stack>
      {creatures.length > 0 && (
        <Box align="center">
          <Stack w="80%" gap="sm">
            <Group justify="space-between">
              <Title order={3}>Scp объекты которые используются в статье:</Title>

              <Group gap="sm">
                <Button onClick={handleOpenModal}>Добавить Scp в статью</Button>
                <Button>Добавить теги в статью</Button>
              </Group>
            </Group>

            {openAddScp && (
              <Modal
                centered
                size="lg"
                opened={openAddScp}
                onClose={handleCloseModal}
                title="Прикрепить объект к статье"
              >
                <FormArticleAddScp articleId={id} />
              </Modal>
            )}

            <Stack>
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

      <NotesArticleScp article={article} articleId={id} />
    </Stack>
  );
}
