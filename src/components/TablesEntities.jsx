import { Table } from "@mantine/core";

import { router } from "../router";

export default function TablesEntities({ tables }) {
  return (
    <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover="true">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Существующие таблицы</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {tables.map((item, index) => {
          return (
            <Table.Tr key={`table-${index}`} onClick={() => router.navigate(`${item.link}`)}>
              {console.log(item.link)}
              <Table.Td>{item.name}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
