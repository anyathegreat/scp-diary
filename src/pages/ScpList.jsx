import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScps } from "../store/scplist/slice";

export default function ScpList() {
  const dispatch = useDispatch();

  const scpList = useSelector((state) => state.scpList.list);

  useEffect(() => {
    dispatch(getScps());
  }, [dispatch]);

  return (
    <div>
      {scpList.map((item, index) => {
        return <div key={index}>{item.title}</div>;
      })}
    </div>
  );
}
