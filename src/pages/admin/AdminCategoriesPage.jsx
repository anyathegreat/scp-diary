import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { Box, Button, Flex, Group, Table, Title, Typography } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { getCategories } from "../../store/categoryList/slice";
import { deleteCategoryItem } from "../../store/categoryItem/slice";

export default function AdminCategoriesPage() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categoryList.list);

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategoryItem(categoryId));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Box>
      <Flex justify={{ base: "center", xs: "space-between" }} wrap="wrap" gap="sm">
        <Title>Категории</Title>

        <Group gap="sm">
          <Button size="md" component={Link} to="/admin">
            Назад
          </Button>

          <Button size="md">Создать</Button>
        </Group>
      </Flex>

      <Table verticalSpacing="md" horizontalSpacing="md" mt="20px">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Название</Table.Th>
            <Table.Th>slug</Table.Th>
            <Table.Th w={{ base: "30%", sm: "20%" }} style={{ wordBreak: "break-word" }}>
              Редактировать
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {categories.length > 0 ? (
            categories.map((item) => {
              return (
                <Table.Tr key={`tableCategory-${item.categoryId}`}>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.slug}</Table.Td>

                  <Table.Td ta="center">
                    <Group justify="center" gap="xs">
                      <Button>
                        <IconEdit />
                      </Button>

                      <Button bg="#961818" onClick={() => handleDeleteCategory(item.categoryId)}>
                        <IconTrash />
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              );
            })
          ) : (
            <Table.Tr ta="center">
              <Table.Td colSpan={3}>Категорий не существует</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
