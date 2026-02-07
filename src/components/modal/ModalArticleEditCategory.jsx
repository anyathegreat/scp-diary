import { useState } from "react";
import { Box, Button, Group } from "@mantine/core";

import FormArticleAddCategory from "../form/FormArticleAddCategory";
import FormArticleDeleteCategory from "../form/FormArticleDeleteCategory";
import ModalTypeVisible from "./ModalTypeVisible";

export default function ModalArticleEditCategory({ typeVisible, open, close, article }) {
  const [addArticleCategory, setAddArticleCategory] = useState(false);
  const [deleteArticleCategory, setDeleteArticleCategory] = useState(false);

  const handleAddArticleCategory = () => {
    setAddArticleCategory(true);
    setDeleteArticleCategory(false);
  };

  const handleDeleteArticleCategory = () => {
    setAddArticleCategory(false);
    setDeleteArticleCategory(true);
  };

  const modalChildren = (
    <Box>
      <Group justify="center" gap="sm" mb="sm">
        <Button onClick={handleAddArticleCategory}>Привязать категорию</Button>
        <Button onClick={handleDeleteArticleCategory}>Отвязать категорию</Button>
      </Group>

      {addArticleCategory && <FormArticleAddCategory articleId={article.articleId} closeModal={close} />}
      {deleteArticleCategory && <FormArticleDeleteCategory article={article} closeModal={close} />}
    </Box>
  );

  return (
    <ModalTypeVisible
      typeVisible={typeVisible}
      children={modalChildren}
      title="Изменение категории в статье"
      open={open}
      close={close}
    />
  );
}
