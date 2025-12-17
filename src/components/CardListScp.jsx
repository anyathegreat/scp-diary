import { Box, Button, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

import { deleteScpItem } from "../store/scpItem/slice";

export default function ListScp({ scp }) {
  const dispatch = useDispatch();

  return (
    <Card padding="md" h="330px" radius="md" withBorder>
      <Card.Section>
        <Image
          src={scp?.image || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
          height={180}
          alt={scp.title}
        />
      </Card.Section>

      <Stack align="center" justify="space-between" mt="md">
        <Stack w="100%" gap="2px" align="center">
          <Title size="h3" textWrap="nowrap">{`Scp-${scp["scp-number"]}`}</Title>
          <Box w="100%">
            <Text ta="center" truncate="end">
              {scp.title}
            </Text>
          </Box>
        </Stack>

        <Group gap="8px" wrap="nowrap">
          <Button size="sm">
            <IconEdit />
          </Button>

          <Button onClick={() => dispatch(deleteScpItem(scp.id))} size="sm" color="rgba(150, 29, 29, 1)">
            <IconTrash />
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
