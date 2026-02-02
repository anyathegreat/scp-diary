import { Box, Button, Grid, Group, Modal, Skeleton, Stack } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getScps } from "../store/scpList/slice";

import ListScp from "../components/CardListScp";
import FormScp from "../components/form/FormAddListScp";

export default function ScpList() {
  const dispatch = useDispatch();

  const scpList = useSelector((state) => state.scpList.list);
  const { loading } = useSelector((state) => state.scpList);

  const [openModal, setOpenModal] = useState();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(getScps());
  }, [dispatch]);

  if (loading) {
    return (
      <Group justify="center" gap="15px" nowrap="wrap">
        <Skeleton height={280} miw="14%" maw="30%" />
        <Skeleton height={280} miw="14%" maw="30%" />
        <Skeleton height={280} miw="14%" maw="30%" />
        <Skeleton height={280} miw="14%" maw="30%" />
        <Skeleton height={280} miw="14%" maw="30%" />
        <Skeleton height={280} miw="14%" maw="30%" />
      </Group>
    );
  }

  return (
    <Stack>
      <Box align="center">
        <Button onClick={handleOpenModal}>Добавить Scp объект</Button>
      </Box>

      <Modal
        visibleFrom="sm"
        size="lg"
        title="Добавить SCP объект в базу данных"
        opened={openModal}
        onClose={handleCloseModal}
      >
        {openModal && <FormScp />}
      </Modal>

      <Modal
        hiddenFrom="sm"
        title="Добавить SCP объект в базу данных"
        fullScreen
        opened={openModal}
        onClose={handleCloseModal}
      >
        {openModal && <FormScp />}
      </Modal>

      <Grid align="center" m="10px">
        {scpList.map((item) => {
          return (
            <Grid.Col span={{ base: 6, lg: 2, md: 3, sm: 6 }} key={`Scp-${item.scpNumber}`}>
              <ListScp scp={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}
