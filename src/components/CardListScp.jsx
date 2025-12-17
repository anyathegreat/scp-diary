import { Box, Button, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function ListScp({ scp }) {
  console.log(scp);
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
        <Stack gap="2px" align="center">
          <Title order={3}>{`Scp-${scp["scp-number"]}`}</Title>
          <Text>{scp.title}</Text>
        </Stack>

        <Box>
          <Group gap="10px" wrap="nowrap" visibleFrom="sm">
            <Button size="sm">Изменить</Button>

            <Button size="sm" color="rgba(150, 29, 29, 1)">
              Удалить
            </Button>
          </Group>

          <Group gap="10px" wrap="nowrap" hiddenFrom="sm">
            <Button size="xs">
              <IconEdit />
            </Button>

            <Button size="xs">
              <IconTrash />
            </Button>
          </Group>
        </Box>
      </Stack>
    </Card>
  );
}
