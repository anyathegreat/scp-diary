import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import { Box, Button, Flex, Group, Table, Title, Typography, useMantineTheme } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { deleteScpItem } from "@/store/scpItem/slice";
import { getScps } from "@/store/scpList/slice";

import ModalAdminAddScp from "@/components/modal/admin/ModalAdminAddScp";
import ModalAdminEditScp from "@/components/modal/admin/ModalAdminEditScp";

export default function AdminScpListPage() {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const scpList = useSelector((state) => state.scpList.list);

  const [modalAddScp, setModalAddScp] = useState(false);
  const [editScp, setEditScp] = useState(null);
  const [modalEditScp, setModalEditScp] = useState(false);

  const handleDeleteScp = (scpId) => {
    dispatch(deleteScpItem(scpId));
  };

  const handleModalAddScp = () => {
    setModalAddScp((prev) => !prev);
  };

  const handleOpenModalEditScp = (scpItem) => {
    setEditScp(scpItem);
    setModalEditScp(true);
  };

  const handleCloseModalEditScp = () => {
    setEditScp(null);
    setModalEditScp(false);
  };

  useEffect(() => {
    dispatch(getScps());
  }, [dispatch]);

  return (
    <Box>
      <Flex justify={{ base: "center", xs: "space-between" }} wrap="wrap" gap="sm">
        <Title>{`Объекты Scp`} </Title>

        <Group gap="sm">
          <Button size="md" component={Link} to="/admin">
            Назад
          </Button>

          <Button size="md" onClick={handleModalAddScp}>
            Создать
          </Button>
        </Group>
      </Flex>

      <Table verticalSpacing="md" horizontalSpacing="md" mt="20px">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Имя</Table.Th>
            <Table.Th>Номер</Table.Th>
            {!isMobile && <Table.Th>Описание</Table.Th>}
            <Table.Th w={{ base: "30%", sm: "20%" }} style={{ wordBreak: "break-word" }}>
              Редактировать
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {scpList.length > 0 ? (
            scpList.map((item) => {
              return (
                <Table.Tr key={`tableScp-${item.scpId}`}>
                  <Table.Td>{item.title}</Table.Td>
                  <Table.Td>{item.scpNumber}</Table.Td>
                  {!isMobile && (
                    <Table.Td style={{ wordBreak: "break-word" }}>
                      <Typography>
                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                      </Typography>
                    </Table.Td>
                  )}

                  <Table.Td ta="center">
                    <Group justify="center" gap="xs">
                      <Button onClick={() => handleOpenModalEditScp(item)}>
                        <IconEdit />
                      </Button>

                      <Button bg="#961818" onClick={() => handleDeleteScp(item.scpId)}>
                        <IconTrash />
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              );
            })
          ) : (
            <Table.Tr ta="center">
              <Table.Td colSpan={isMobile ? 3 : 4}>Объектов Scp не существует</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      {modalAddScp && <ModalAdminAddScp modalVariant="desktop" open={modalAddScp} close={handleModalAddScp} />}
      {modalAddScp && <ModalAdminAddScp modalVariant="mobile" open={modalAddScp} close={handleModalAddScp} />}

      {editScp && (
        <ModalAdminEditScp
          modalVariant="desktop"
          editScp={editScp}
          open={modalEditScp}
          close={handleCloseModalEditScp}
        />
      )}
      {editScp && (
        <ModalAdminEditScp
          modalVariant="mobile"
          editScp={editScp}
          open={modalEditScp}
          close={handleCloseModalEditScp}
        />
      )}
    </Box>
  );
}
