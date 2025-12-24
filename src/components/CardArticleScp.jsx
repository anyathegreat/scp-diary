import { Box, Button, Card, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function ArticleCard({ articles }) {
  const categories = articles?.categories.length != 0 ? articles.categories : null;

  return (
    <Card w="70%" padding="md" radius="md" withBorder>
      <Group justify="space-between">
        <Box>
          <Title order={3}>{articles.title}</Title>

          {categories && (
            <Group gap="8px" mt="6px">
              {categories.map((item) => {
                return (
                  <Box key={`categories-${item.id}`} bg="#4a505c" bdrs="10px" py="2px" px="10px">{`#${item.name}`}</Box>
                );
              })}
            </Group>
          )}
        </Box>

        <Box>
          <Button size="xs">
            <IconEdit />
          </Button>
          <Button ml="sm" size="xs" color="red">
            <IconTrash />
          </Button>
        </Box>
      </Group>

      <Divider mt="6px" />

      <Text>{articles.description}</Text>
    </Card>
  );
}
