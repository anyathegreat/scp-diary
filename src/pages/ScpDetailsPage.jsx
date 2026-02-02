import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Box, Flex, Group, Image, Skeleton, Text, Typography } from "@mantine/core";

import { getScpItem } from "../store/scpItem/slice";

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
      <Group w={{ base: "100%", sm: "90%" }} justify="space-between" p="6px" h="340px">
        <Box w="320px">
          <Image
            alt="Тут должна быть картинка("
            w="100%"
            mah="340px"
            radius="20px"
            fit="cover"
            src={scpItem[0]?.image}
          />
        </Box>

        <Flex w={{ base: "100%", sm: "50%" }} h="100%">
          <Typography>
            <div dangerouslySetInnerHTML={{ __html: scpItem[0]?.description }} />
          </Typography>
        </Flex>
      </Group>
    </Box>
  );
}
