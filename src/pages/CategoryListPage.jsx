import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid } from "@mantine/core";

import { getCategories } from "@/store/categoryList/slice";

import CardCategory from "@/components/CardCategory";
import ModalAddCategory from "@/components/modal/ModalAddCategory";

export default function CategoryListPage() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categoryList.list);

  const [modalAddCategory, setModalAddCategory] = useState(false);

  const handleModalAddCategory = () => {
    setModalAddCategory((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Box>
      <Button onClick={handleModalAddCategory}>Создать категорию</Button>

      <Grid mt="16px">
        {categories &&
          categories.map((item) => {
            return (
              <Grid.Col span={{ base: 12, sm: 6 }} key={`category-${item.categoryId}`}>
                <CardCategory category={item} />
              </Grid.Col>
            );
          })}
      </Grid>

      {modalAddCategory && (
        <ModalAddCategory modalVariant="desktop" open={modalAddCategory} close={setModalAddCategory} />
      )}

      {modalAddCategory && (
        <ModalAddCategory modalVariant="mobile" open={modalAddCategory} close={setModalAddCategory} />
      )}
    </Box>
  );
}
