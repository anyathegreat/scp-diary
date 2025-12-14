import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mantine/core";

import { getScps } from "../store/scplist/slice";
import ScpPost from "../components/ScpPost";

export default function ScpList() {
  const dispatch = useDispatch();

  const scpList = useSelector((state) => state.scpList.list);

  useEffect(() => {
    dispatch(getScps());
  }, [dispatch]);

  return (
    <Stack align="center">
      {scpList.map((item) => {
        return <ScpPost key={`Scp-${item["scp-number"]}`} scp={item} />;
      })}
    </Stack>
  );
}
