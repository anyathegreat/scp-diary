import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mantine/core";

import { getCategories } from "../store/categoryList/slice";

import CardCategory from "../components/CardCategory";

export default function CategoryListPage() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categoryList.list);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Grid>
      {categories &&
        categories.map((item) => {
          return (
            <Grid.Col span={{ base: 12, sm: 6 }} key={`category-${item.categoryId}`}>
              <CardCategory category={item} />
            </Grid.Col>
          );
        })}
    </Grid>
  );
}
