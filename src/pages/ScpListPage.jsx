import { Box, Button, Grid, Group, Skeleton, Stack } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getScps } from "../store/scpList/slice";

import ListScp from "../components/CardListScp";
import { Link } from "react-router";

export default function ScpList() {
  const dispatch = useDispatch();

  const scpList = useSelector((state) => state.scpList.list);
  const { loading } = useSelector((state) => state.scpList);

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
        <Button component={Link} to="create">
          Добавить Scp объект
        </Button>
      </Box>

      <Grid align="center" m="10px">
        {scpList.map((item) => {
          return (
            <Grid.Col span={{ base: 6, lg: 2, md: 3, sm: 6 }} key={`Scp-${item["scp-number"]}`}>
              <ListScp scp={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}
