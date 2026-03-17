import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Box, Button, Flex, Group, Table, Title } from "@mantine/core";
import { deleteNote, getArticleItem } from "../../store/articleItem/slice";

import ModalAdminArticleAddNote from "../../components/modal/admin/ModalAdminArticleAddNote";
import ModalAdminArticleUpdateNote from "../../components/modal/admin/ModalAdminArticleUpdateNote";

export default function AdminArticleNotesPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const article = useSelector((state) => state.articleItem.item);
  const { loading } = useSelector((state) => state.articleItem);

  const [noteEdit, setNoteEdit] = useState(false);
  const [modalAddNote, setModalAddNote] = useState(false);
  const [modalUpdateNote, setModalUpdateNote] = useState(false);

  const articleItem = article[0] || null;
  const notes = article[0]?.notes || [];

  const deleteNotes = (note) => {
    dispatch(deleteNote({ articleId: articleItem.articleId, noteId: note.uid }));
  };

  const handleModalAddNote = () => {
    setModalAddNote((prev) => !prev);
  };

  const handleModalUpdateNote = () => {
    setModalUpdateNote((prev) => !prev);
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
            <Title>{`Заметки статьи: ${articleItem.title}`} </Title>

            <Group gap="sm">
              <Button size="md" component={Link} to="/admin/articles">
                Назад
              </Button>

              <Button size="md" onClick={handleModalAddNote}>
                Создать
              </Button>
            </Group>
          </Flex>

          <Table verticalSpacing="md" horizontalSpacing="md" mt="20px">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Описание заметки</Table.Th>
                <Table.Th w={{ base: "30%", sm: "30%" }} style={{ wordBreak: "break-word" }}>
                  Редактировать
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {notes.length > 0 ? (
                notes.map((item) => {
                  return (
                    <Table.Tr key={`tableArticleNotes-${item.uid}`}>
                      <Table.Td style={{ wordBreak: "break-word" }}>{item.text}</Table.Td>

                      <Table.Td>
                        <Group justify="center" gap="xs">
                          <Button
                            onClick={() => {
                              setNoteEdit(item);
                              handleModalUpdateNote();
                            }}
                          >
                            <IconEdit />
                          </Button>

                          <Button bg="#961818" onClick={() => deleteNotes(item)}>
                            <IconTrash />
                          </Button>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  );
                })
              ) : (
                <Table.Tr ta="center">
                  <Table.Td colSpan={2}>У статьи нет заметок</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Box>
      )}

      {modalAddNote && (
        <ModalAdminArticleAddNote
          modalVariant="desktop"
          articleId={articleItem.articleId}
          open={modalAddNote}
          close={handleModalAddNote}
        />
      )}

      {modalAddNote && (
        <ModalAdminArticleAddNote
          modalVariant="mobile"
          articleId={articleItem.articleId}
          open={modalAddNote}
          close={handleModalAddNote}
        />
      )}

      {modalUpdateNote && (
        <ModalAdminArticleUpdateNote
          modalVariant="desktop"
          articleId={articleItem.articleId}
          noteEdit={noteEdit}
          open={modalUpdateNote}
          close={handleModalUpdateNote}
        />
      )}
      {modalUpdateNote && (
        <ModalAdminArticleUpdateNote
          modalVariant="mobile"
          articleId={articleItem.articleId}
          noteEdit={noteEdit}
          open={modalUpdateNote}
          close={handleModalUpdateNote}
        />
      )}
    </Box>
  );
}
