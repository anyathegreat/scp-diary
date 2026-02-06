import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Group, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { getArticles } from "../../store/articleList/slice";

import ModalAdminEditArticle from "../../components/modal/admin/ModalAdminEditArticle";

export default function AdminArticlePage() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.articleList.list);

  const [editArticle, setEditArticle] = useState(null);
  const [modalEditArticle, setModalEditArticle] = useState(false);

  const handleOpenModalEditArticle = (item) => {
    setEditArticle(item);
    setModalEditArticle(true);
  };

  const handleCloseModalEditArticle = () => {
    setModalEditArticle(false);
    setEditArticle(null);
  };

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <>
      <Table verticalSpacing="md" horizontalSpacing="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Название</Table.Th>
            <Table.Th w="30%">Редактировать</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {articles.map((item, index) => {
            return (
              <Table.Tr key={`tableArticle-${index}`}>
                <Table.Td>{item.title}</Table.Td>

                <Table.Td>
                  <Group justify="center" gap="sm">
                    <Button onClick={() => handleOpenModalEditArticle(item)}>
                      <IconEdit />
                    </Button>

                    <Button bg="#961818">
                      <IconTrash />
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      {editArticle && (
        <ModalAdminEditArticle article={editArticle} open={modalEditArticle} close={handleCloseModalEditArticle} />
      )}
    </>
  );
}
