import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Group, Table, Title } from "@mantine/core";

import { getCombinedDbData } from "../../store/combinedDb/slice";

import { router } from "../../router";

export default function AdminPanelPage() {
  const dispatch = useDispatch();

  const tablesSupabase = useSelector((state) => state.combinedDb.data);

  useEffect(() => {
    dispatch(getCombinedDbData());
  }, [dispatch]);

  return (
    <Box>
      <Title>Существующие таблицы</Title>

      <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover="true" mt="20px">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Название</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {tablesSupabase.map((item, index) => {
            return (
              <Table.Tr key={`table-${index}`} onClick={() => router.navigate(`${item.link}`)}>
                <Table.Td>{item.name}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
