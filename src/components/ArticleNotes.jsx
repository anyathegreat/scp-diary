import { useDispatch } from "react-redux";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { DateTime } from "luxon";
import { Box, Divider, Title, Button, Group, Stack, Text, Timeline, useMantineTheme } from "@mantine/core";
import { IconCalendarEvent, IconEdit, IconTrash } from "@tabler/icons-react";

import { deleteNote } from "../store/articleItem/slice";

import FormAddArticleNote from "./form/FormAddArticleNotes";
import ModalArticleUpdateNotes from "./modal/ModalArticleUpdateNotes";

export default function ArticleNotes({ article, articleId }) {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const notes = article[0]?.notes || [];

  const formatDesktopDate = (date) => {
    const formatDate = DateTime.fromISO(date);
    const newDate = formatDate.setLocale("ru").toFormat("dd MMMM yyyy");
    return newDate;
  };

  const formatMobileDate = (date) => {
    const formatDate = DateTime.fromISO(date);
    const newDate = formatDate.setLocale("ru").toFormat("dd.LL.yyyy");
    return newDate;
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote({ articleId: article[0]?.articleId, noteId: noteId }));
  };

  const [noteEdit, setNoteEdit] = useState(null);
  const [openModalNotes, setOpenModalNotes] = useState(false);

  const handleEditClick = (item) => {
    setNoteEdit(item);
    setOpenModalNotes(true);
  };

  const handleCloseModal = () => {
    setOpenModalNotes(false);
    setNoteEdit(null);
  };

  return (
    <Box mt="md" bd="3px solid beige.8" bdrs="4px">
      <Title order={2} fz="36px" mt="12px">
        Хронология изучения:
      </Title>

      <Divider mt="20px" ml="26px" mr="26px" size="2px" color="brown.3" />

      <FormAddArticleNote articleId={articleId} />

      <Stack w={{ base: "92%", sm: "90%" }} my="30px" gap="0">
        <Timeline lineWidth={isMobile ? 5 : 6} bulletSize={isMobile ? 15 : 20}>
          {notes.map((item) => {
            return (
              <Timeline.Item className="bord">
                <Group gap="6px" c="brown.1" justify="space-between">
                  <Group gap="6px" align="center">
                    {!isMobile && <IconCalendarEvent />}

                    <Text fw={700} size="16px" c="brown.1">
                      {isMobile ? formatMobileDate(item.createdAt) : formatDesktopDate(item.createdAt)}
                    </Text>
                  </Group>

                  <Group gap="6px" w={{ base: "60%", xs: "50%" }} justify="end">
                    <Button size="25px" onClick={() => handleEditClick(item)}>
                      <IconEdit />
                    </Button>

                    <Button size="25px" bg="#961818" onClick={() => handleDeleteNote(item.uid)}>
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

      <Box>
        {noteEdit && (
          <ModalArticleUpdateNotes
            modalVariant="desktop"
            open={openModalNotes}
            close={handleCloseModal}
            articleId={articleId}
            noteEdit={noteEdit}
          />
        )}

        {noteEdit && (
          <ModalArticleUpdateNotes
            modalVariant="mobile"
            open={openModalNotes}
            close={handleCloseModal}
            articleId={articleId}
            noteEdit={noteEdit}
          />
        )}
      </Box>
    </Box>
  );
}
