import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { Box, Button, Flex, Group, Table, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { router } from "@/router";
import { deleteArticleCategory, getArticleItem } from "@/store/articleItem/slice";

import ModalAdminArticleAddCategory from "@/components/modal/admin/ModalAdminArticleAddCategory";

export default function AdminArticleCategoriesPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [modalArticleAddCategory, setModalArticleAddCategory] = useState(false);

  const article = useSelector((state) => state.articleItem.item);
  const { loading } = useSelector((state) => state.articleItem);

  const articleItem = article[0] || null;
  const categories = article[0]?.categories || [];

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteArticleCategory({ body: { category_id: categoryId, article_id: id } }));
  };

  const handleModalArticleAddCategory = () => {
    setModalArticleAddCategory((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getArticleItem(id));
  }, [dispatch, id]);

  if (loading) {
    return <Box></Box>;
  }

  return (
    <Box>
      {articleItem && (
        <Box>
          <Flex justify={{ base: "center", md: "space-between" }} wrap="wrap" gap="sm">
            <Title>{`Категории статьи: ${articleItem.title}`} </Title>

            <Group gap="sm">
              <Button size="md" component={Link} to="/admin/articles">
                Назад
              </Button>

              <Button size="md" onClick={handleModalArticleAddCategory}>
                Добавить
              </Button>
            </Group>
          </Flex>

          <Table verticalSpacing="md" horizontalSpacing="md" mt="20px">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Название</Table.Th>
                <Table.Th>slug</Table.Th>
                <Table.Th w={{ base: "10%", sm: "30%" }} style={{ wordBreak: "break-word" }}>
                  Редактировать
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {categories.length > 0 ? (
                categories.map((item) => {
                  return (
                    <Table.Tr key={`tableArticleCategories-${item.id}`}>
                      <Table.Td w={{ base: "45%", sm: "35%" }} style={{ wordBreak: "break-word" }}>
                        {item.name}
                      </Table.Td>
                      <Table.Td w={{ base: "45%", sm: "35%" }} style={{ wordBreak: "break-word" }}>
                        {item.slug}
                      </Table.Td>

                      <Table.Td ta="center">
                        <Button bg="#961818" onClick={() => handleDeleteCategory(item.id)}>
                          <IconTrash />
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  );
                })
              ) : (
                <Table.Tr ta="center">
                  <Table.Td colSpan={3}>У статьи нет привязанных категорий</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Box>
      )}

      {modalArticleAddCategory && (
        <ModalAdminArticleAddCategory
          modalVariant="desktop"
          articleId={id}
          open={modalArticleAddCategory}
          close={handleModalArticleAddCategory}
        />
      )}
      {modalArticleAddCategory && (
        <ModalAdminArticleAddCategory
          modalVariant="mobile"
          articleId={id}
          open={modalArticleAddCategory}
          close={handleModalArticleAddCategory}
        />
      )}
    </Box>
  );
}
