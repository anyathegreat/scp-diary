import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { getScpItem } from "../store/scpItem/slice";
import { Box, Group, Image, Skeleton } from "@mantine/core";

export default function ScpDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const scpItem = useSelector((state) => state.scpItem.item);
  const { loading } = useSelector((state) => state.scpItem);

  useEffect(() => {
    dispatch(getScpItem(id));
  }, [dispatch, id]);

  if (loading) {
    return <Skeleton h="50px"></Skeleton>;
  }

  return (
    <Box align="center">
      <Group w={{ base: "100%", sm: "65%" }} justify="space-between" p="6px">
        <Box>
          <Image mah="400px" w="348px" radius="20px" fit="cover" src={scpItem[0]?.image} />
        </Box>

        <Box w={{ base: "100%", sm: "50%" }}>{scpItem[0]?.description}</Box>
      </Group>
    </Box>
  );
}
