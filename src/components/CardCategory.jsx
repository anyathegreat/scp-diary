import { Button, Card, Group, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function CardCategory({ category }) {
  return (
    <Card>
      <Group justify="space-between">
        <Title order={3} fz="26">
          {category.name}
        </Title>

        <Group gap="xs">
          <Button>
            <IconEdit />
          </Button>
          <Button>
            <IconTrash />
          </Button>
        </Group>
      </Group>
    </Card>
  );
}
