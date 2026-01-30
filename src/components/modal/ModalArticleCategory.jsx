import { useState } from "react";
import { Button, Group, Modal } from "@mantine/core";

import FormArticleAddCategory from "../form/FormArticleAddCategory";
import FormArticleDeleteCategory from "../form/FormArticleDeleteCategory";

export default function ModalArticleCategory({ open, close, article }) {
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

  return (
    <Modal centered size="lg" opened={open} onClose={close} title="Изменение категории в статье">
      <Group justify="center" gap="sm" mb="sm">
        <Button onClick={handleAddArticleCategory}>Привязать категорию к статье</Button>
        <Button onClick={handleDeleteArticleCategory}>Отвязать категорию от статьи</Button>
      </Group>

      {addArticleCategory && <FormArticleAddCategory articleId={article.articleId} closeModal={close} />}
      {deleteArticleCategory && <FormArticleDeleteCategory article={article} closeModal={close} />}
    </Modal>
  );
}
