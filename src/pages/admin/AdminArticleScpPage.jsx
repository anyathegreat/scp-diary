import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Flex, Group, Table, Title, Typography, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { deleteArticleScp, getArticleItem } from "../../store/articleItem/slice";

import ModalAdminArticleAddScp from "../../components/modal/admin/ModalAdminArticleAddScp";

export default function AdminArticleScpPage() {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

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

  useEffect(() => {
    dispatch(getArticleItem(id));
  }, [dispatch, id]);

  return (
    <Box>
      {articleItem && (
        <Box>
          <Flex justify={{ base: "center", md: "space-between" }} wrap="wrap" gap="sm">
            <Title>{`Существа статьи: ${articleItem.title}`} </Title>

            <Group gap="sm">
              <Button size="md" component={Link} to="/admin/articles">
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
                <Table.Th w={{ base: "20%", sm: "30%" }} style={{ wordBreak: "break-word" }}>
                  Редактировать
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {creatures.length > 0 ? (
                creatures.map((item) => {
                  return (
                    <Table.Tr key={`tableArticleScp-${item.id}`}>
                      <Table.Td>{item.title}</Table.Td>
                      <Table.Td style={{ wordBreak: "break-word" }}>{item["scp_number"]}</Table.Td>

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
