import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mantine/core";

import { getCombinedDbData } from "../../store/combinedDb/slice";

import TablesEntities from "../../components/TablesEntities";

export default function AdminPanelPage() {
  const dispatch = useDispatch();

  const tablesSupabase = useSelector((state) => state.combinedDb.data);

  useEffect(() => {
    dispatch(getCombinedDbData());
  }, [dispatch]);

  return (
    <Box>
      <TablesEntities tables={tablesSupabase} />
    </Box>
  );
}
