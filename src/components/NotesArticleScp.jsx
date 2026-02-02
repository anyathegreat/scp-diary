import { useState } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { Box, Button, Divider, Group, Modal, Stack, Text, Timeline, Title, useMantineTheme } from "@mantine/core";
import { IconCalendarEvent, IconEdit, IconTrash } from "@tabler/icons-react";

import { deleteNote } from "../store/articleItem/slice";

import FormUpdateNotes from "./form/FormUpdateNotes";
import FormAddArticleNote from "./form/FormAddArticleNotes";

export default function NotesArticleScp({ article, articleId }) {
  const dispatch = useDispatch();
  const theme = useMantineTheme();

  const notes = article[0]?.notes || [];

  const [noteEdit, setNoteEdit] = useState(null);
  const [openModalNotes, setOpenModalNotes] = useState(false);

  const formatDate = (date) => {
    const formatDate = DateTime.fromISO(date);
    const newDate = formatDate.setLocale("ru").toFormat("dd MMMM yyyy");
    return newDate;
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote({ articleId: articleId, noteId: noteId }));
  };

  const handleEditClick = (item) => {
    setNoteEdit(item);
    setOpenModalNotes(true);
  };

  const handleCloseModal = () => {
    setOpenModalNotes(false);
    setNoteEdit(null);
  };

  return (
    <Box mt="md" bd="3px solid beige.8" p="md" bdrs="4px">
      <Title order={2} fz="36px">
        Хронология изучения:
      </Title>

      <Divider mt="20px" ml="26px" mr="26px" size="2px" color="brown.3" />

      <FormAddArticleNote articleId={articleId} />

      {notes.length > 0 ? (
        <Stack w="90%" my="30px">
          <Timeline lineWidth={6} bulletSize={20}>
            {notes.map((item) => {
              return (
                <Timeline.Item className="bord">
                  <Group gap="6px" c="brown.1" justify="space-between">
                    <Group gap="6px" align="center">
                      <IconCalendarEvent />

                      <Text fw={700} size="16px" c="brown.1">
                        {formatDate(item.createdAt)}
                      </Text>
                    </Group>

                    <Group gap="6px" w={{ base: "100%", xs: "50%" }} justify="end">
                      <Button size="25px" onClick={() => handleEditClick(item)}>
                        <IconEdit />
                      </Button>

                      <Button size="25px" color="#961818" onClick={() => handleDeleteNote(item.uid)}>
                        <IconTrash />
                      </Button>
                    </Group>
                  </Group>

                  <Box
                    w="100%"
                    p="6px"
                    mt="14px"
                    bd="2px solid brown.0"
                    bdrs="4px"
                    style={{ boxShadow: `1px -5px   ${theme.colors.brown[0]}` }}
                  >
                    <Text c="brown.1" size="18px" style={{ wordBreak: "break-word" }}>
                      {item.text}
                    </Text>
                  </Box>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Stack>
      ) : (
        <Text>У вас пока нету заметок!</Text>
      )}

      {noteEdit && (
        <Modal title="Редактировать заметку" opened={openModalNotes} onClose={handleCloseModal} centered>
          <FormUpdateNotes articleId={articleId} noteEdit={noteEdit} />
        </Modal>
      )}
    </Box>
  );
}
