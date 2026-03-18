import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Flex, Group, Table, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { getArticles } from "@/store/articleList/slice";
import { deleteArticleItem } from "@/store/articleItem/slice";

import ModalAdminEditArticle from "@/components/modal/admin/ModalAdminEditArticle";
import ModalAdminAddArticle from "@/components/modal/admin/ModalAdminAddArticle";

export default function AdminArticlePage() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.articleList.list);
  const { loading } = useSelector((state) => state.articleList);

  const [editArticle, setEditArticle] = useState(null);
  const [modalEditArticle, setModalEditArticle] = useState(false);
  const [modalAddArticle, setModalAddArticle] = useState(false);

  const handleModalAddArticle = () => {
    setModalAddArticle((prev) => !prev);
  };

  const handleOpenModalEditArticle = (item) => {
    setEditArticle(item);
    setModalEditArticle(true);
  };

  const handleCloseModalEditArticle = () => {
    setModalEditArticle(false);
    setEditArticle(null);
  };

  const handleDeleteArticle = (articleId) => {
    dispatch(deleteArticleItem(articleId));
  };

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  if (loading) {
    return <Box></Box>;
  }

  return (
    <Box>
      <Flex justify={{ base: "center", xs: "space-between" }} wrap="wrap" gap="sm">
        <Title>Существующие cтатьи</Title>

        <Group gap="sm">
          <Button size="md" component={Link} to="/admin">
            Назад
          </Button>

          <Button size="md" onClick={handleModalAddArticle}>
            Создать
          </Button>
        </Group>
      </Flex>

      <Table verticalSpacing="md" horizontalSpacing="lg" mt="20px">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Название</Table.Th>
            <Table.Th w={{ base: "30%", sm: "30%" }} style={{ wordBreak: "break-word" }}>
              Редактировать
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {articles.length > 0 ? (
            articles.map((item, index) => {
              return (
                <Table.Tr key={`tableArticle-${index}`}>
                  <Table.Td style={{ wordBreak: "break-word" }}>{item.title}</Table.Td>

                  <Table.Td>
                    <Group justify="center" gap="sm">
                      <Button onClick={() => handleOpenModalEditArticle(item)}>
                        <IconEdit />
                      </Button>

                      <Button bg="#961818" onClick={() => handleDeleteArticle(item.articleId)}>
                        <IconTrash />
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              );
            })
          ) : (
            <Table.Tr ta="center">
              <Table.Td colSpan={2}>Статей не существует</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      {editArticle && (
        <ModalAdminEditArticle
          modalVariant="desktop"
          article={editArticle}
          open={modalEditArticle}
          close={handleCloseModalEditArticle}
        />
      )}

      {editArticle && (
        <ModalAdminEditArticle
          modalVariant="mobile"
          article={editArticle}
          open={modalEditArticle}
          close={handleCloseModalEditArticle}
        />
      )}

      {modalAddArticle && (
        <ModalAdminAddArticle modalVariant="desktop" open={modalAddArticle} close={handleModalAddArticle} />
      )}
      {modalAddArticle && (
        <ModalAdminAddArticle modalVariant="mobile" open={modalAddArticle} close={handleModalAddArticle} />
      )}
    </Box>
  );
}
