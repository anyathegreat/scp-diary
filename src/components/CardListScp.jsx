import { Box, Button, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

import { deleteScpItem } from "../store/scpItem/slice";
import { Link } from "react-router";

export default function ListScp({ scp }) {
  const dispatch = useDispatch();

  return (
    <Card padding="md" h="330px" radius="md" withBorder>
      <Card.Section>
        <Image
          src={scp?.image || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
          height={180}
          alt={scp.title}
          fit="cover"
        />
      </Card.Section>

      <Stack align="center" justify="space-between" mt="md">
        <Stack w="100%" gap="2px" align="center">
          <Title order={3} textWrap="nowrap">{`Scp-${scp.scpNumber}`}</Title>

          <Text ta="center" truncate="end">
            {scp.title}
          </Text>
        </Stack>

        <Group gap="8px" wrap="nowrap">
          <Button component={Link} to={String(scp.scpId)} size="sm">
            <IconEdit />
          </Button>

          <Button onClick={() => dispatch(deleteScpItem(scp.scpId))} size="sm" color="#961818">
            <IconTrash />
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
