import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Flex, Group, Table, Title, Typography } from "@mantine/core";

import { deleteArticleScp, getArticleItem } from "../../store/articleItem/slice";
import { router } from "../../router";
import { IconTrash } from "@tabler/icons-react";
import ModalAdminArticleAddScp from "../../components/modal/admin/ModalAdminArticleAddScp";

export default function AdminArticleScpPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [modalArticleAddScp, setModalArticleAddScp] = useState(false);

  const article = useSelector((state) => state.articleItem.item);
  const { loading } = useSelector((state) => state.articleItem);

  const articleItem = article[0] || null;
  const creatures = article[0]?.creatures || [];

  const handleDeleteScp = (scpId) => {
    dispatch(deleteArticleScp({ body: { creature_id: scpId, article_id: id } }));
  };

  const handleModalArticleAddScp = () => {
    setModalArticleAddScp((prev) => !prev);
  };

  console.log(creatures);

  useEffect(() => {
    dispatch(getArticleItem(id));
  }, [dispatch, id]);

  return (
    <Box>
      {articleItem && (
        <Box>
          <Flex justify={{ base: "center", sm: "space-between" }} wrap="wrap" gap="sm">
            <Title>{`Существа статьи: ${articleItem.title}`} </Title>

            <Group gap="sm">
              <Button size="md" onClick={() => router.navigate("/admin/articles")}>
                Назад
              </Button>

              <Button size="md" onClick={handleModalArticleAddScp}>
                Добавить
              </Button>
            </Group>
          </Flex>

          <Table verticalSpacing="md" horizontalSpacing="md" mt="20px">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Имя</Table.Th>
                <Table.Th>Номер</Table.Th>
                <Table.Th>Описание</Table.Th>
                <Table.Th w={{ base: "40%", sm: "30%" }} style={{ wordBreak: "break-word" }}>
                  Редактировать
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {creatures.length > 0 ? (
                creatures.map((item) => {
                  return (
                    <Table.Tr key={`tableCategories-${item.id}`}>
                      <Table.Td>{item.title}</Table.Td>
                      <Table.Td>{item["scp_number"]}</Table.Td>
                      <Table.Td>
                        <Typography>
                          <div dangerouslySetInnerHTML={{ __html: item.description }} />
                        </Typography>
                      </Table.Td>

                      <Table.Td ta="center">
                        <Button bg="#961818" onClick={() => handleDeleteScp(item.id)}>
                          <IconTrash />
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  );
                })
              ) : (
                <Table.Tr ta="center">
                  <Table.Td colSpan={4}>У статьи нет привязанных существ</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>

          {modalArticleAddScp && (
            <ModalAdminArticleAddScp
              modalVariant="desktop"
              articleId={id}
              open={modalArticleAddScp}
              close={handleModalArticleAddScp}
            />
          )}

          {modalArticleAddScp && (
            <ModalAdminArticleAddScp
              modalVariant="mobile"
              articleId={id}
              open={modalArticleAddScp}
              close={handleModalArticleAddScp}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
