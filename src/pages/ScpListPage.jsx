import { Box, Button, Grid, Group, Skeleton, Stack } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getScps } from "@/store/scpList/slice";

import CardScp from "@/components/CardScp";
import ModalAddScp from "@/components/modal/ModalAddScp";

export default function ScpList() {
  const dispatch = useDispatch();

  const scpList = useSelector((state) => state.scpList.list);
  const { loading } = useSelector((state) => state.scpList);

  const [modalAddScp, setModalAddScp] = useState();

  const handleModalAddScp = () => {
    setModalAddScp((prev) => !prev);
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
        <Button onClick={handleModalAddScp}>Добавить Scp объект</Button>
      </Box>

      <Grid align="center" m="10px">
        {scpList.map((item) => {
          return (
            <Grid.Col span={{ base: 6, lg: 2, md: 3, sm: 6 }} key={`Scp-${item.scpNumber}`}>
              <CardScp scp={item} />
            </Grid.Col>
          );
        })}
      </Grid>

      {modalAddScp && <ModalAddScp modalVariant="desktop" open={modalAddScp} close={handleModalAddScp} />}
      {modalAddScp && <ModalAddScp modalVariant="mobile" open={modalAddScp} close={handleModalAddScp} />}
    </Stack>
  );
}
