import { Box, Button, Grid, Stack } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getScps } from "../store/scpList/slice";
import { handleTimeLogin } from "../testItem";

import FormScp from "../components/FormScp";
import ListScp from "../components/ListScp";

export default function ScpPosts() {
  const dispatch = useDispatch();

  const scpList = useSelector((state) => state.scpList.list);

  const [hiddenForm, setHiddenForm] = useState(true);

  useEffect(() => {
    dispatch(getScps());
  }, [dispatch]);

  return (
    <Stack>
      <Box align="center">
        <Button onClick={() => setHiddenForm((prev) => !prev)}>Добавить Scp объект</Button>
      </Box>

      {!hiddenForm && (
        <Stack align="center">
          <FormScp />
          <Button onClick={() => handleTimeLogin}>Получить токен</Button>
        </Stack>
      )}

      <Grid align="center" m="10px">
        {scpList.map((item) => {
          return (
            <Grid.Col span={2}>
              <ListScp key={`Scp-${item["scp-number"]}`} scp={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}
