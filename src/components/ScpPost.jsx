import { Button, Card, Divider, Flex, Group, Stack, Text, Title } from "@mantine/core";

export default function ScpPost({ scp }) {
  return (
    <Card padding="sm" radius="md" w="80%" withBorder>
      <Flex justify="space-between" align="center">
        <Title order={3}>{`Scp-${scp["scp-number"]} - ${scp.title}`}</Title>

        <Group>
          <Button size="md">Редактировать</Button>
          <Button size="md" color="rgba(150, 29, 29, 1)">
            Удалить
          </Button>
        </Group>
      </Flex>

      <Divider my="sm" mb="" color="#948e8e54" />

      <Stack gap="2px">
        <Text size="lg" fw={600}>
          Описание:
        </Text>
        <Text>{scp.description}</Text>
      </Stack>
    </Card>
  );
}
