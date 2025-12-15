import { Box, Button, Card, Divider, Flex, Stack, Text, Title } from "@mantine/core";

export default function ListScp({ scp }) {
  return (
    <Card padding="sm" h="350px" radius="md" withBorder>
      <Stack>
        <Box align="center">
          <Title order={3}>{`Scp-${scp["scp-number"]}`}</Title>
          <Text>{scp.title}</Text>
        </Box>
      </Stack>

      <Divider my="2px" color="#948e8e54" />

      <Stack h="100%" justify="space-between" align="center">
        <Text>{scp.description}</Text>

        <Stack gap="5px" align="center">
          <Button size="sm">Редактировать</Button>
          <Button size="sm" color="rgba(150, 29, 29, 1)">
            Удалить
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
