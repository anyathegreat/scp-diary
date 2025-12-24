import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { getScpItem } from "../store/scpItem/slice";
import { Box, Group, Image, Skeleton } from "@mantine/core";

export default function ScpDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const scp = useSelector((state) => state.scpItem.item);
  // const { loading } = useSelector((state) => state.scpItem);

  useEffect(() => {
    dispatch(getScpItem(id));
  }, [dispatch, id]);

  // if (loading) {
  //   return <Skeleton h="50px"></Skeleton>;
  // }

  return (
    <Box>
      <Group justify="space-between">
        <Box bd="2px solid #fff" bdrs="20px" w={{ base: "100%", sm: "40%" }}>
          <Image h="400px" radius="20px" fit="contain" src={scp?.image} />
        </Box>

        <Box></Box>
      </Group>
    </Box>
  );
}
