import { useState } from "react";
import { Button, Group, Modal } from "@mantine/core";

import FormArticleAddScp from "../form/FormArticleAddScp";
import FormArticleDeleteScp from "../form/FormArticleDeleteScp";

export default function ModalArticleScp({ open, close, article }) {
  const [addArticleScp, setAddArticleScp] = useState(false);
  const [deleteArticleScp, setDeleteArticleScp] = useState(false);

  const handleAddArticleScp = () => {
    setAddArticleScp(true);
    setDeleteArticleScp(false);
  };

  const handleDeleteArticleScp = () => {
    setAddArticleScp(false);
    setDeleteArticleScp(true);
  };

  return (
    <Modal centered size="lg" opened={open} onClose={close} title="Изменение Scp в статье">
      <Group justify="center" gap="sm" mb="sm">
        <Button onClick={handleAddArticleScp}>Привязать scp к статье </Button>
        <Button onClick={handleDeleteArticleScp}>Отвязать scp от статьи</Button>
      </Group>

      {addArticleScp && <FormArticleAddScp articleId={article.articleId} closeModal={close} />}
      {deleteArticleScp && <FormArticleDeleteScp article={article} closeModal={close} />}
    </Modal>
  );
}
