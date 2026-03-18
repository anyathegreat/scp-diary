import { useState } from "react";
import { Box, Button, Group } from "@mantine/core";

import FormArticleAddCategory from "@/components/form/FormArticleAddCategory";
import FormArticleDeleteCategory from "@/components/form/FormArticleDeleteCategory";
import CustomModal from "@/components/modal/CustomModal";

export default function ModalArticleEditCategory({ modalVariant, open, close, article }) {
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
        <Button w="190px" onClick={handleAddArticleCategory}>
          Привязать категорию
        </Button>
        <Button w="190px" onClick={handleDeleteArticleCategory}>
          Отвязать категорию
        </Button>
      </Group>

      {addArticleCategory && <FormArticleAddCategory articleId={article.articleId} closeModal={close} />}
      {deleteArticleCategory && <FormArticleDeleteCategory article={article} closeModal={close} />}
    </Box>
  );

  return (
    <CustomModal
      modalVariant={modalVariant}
      children={modalChildren}
      title="Изменение категории в статье"
      opened={open}
      onClose={close}
    />
  );
}
