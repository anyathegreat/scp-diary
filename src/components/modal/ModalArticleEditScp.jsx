import { useState } from "react";
import { Box, Button, Group } from "@mantine/core";

import FormArticleAddScp from "../form/FormArticleAddScp";
import FormArticleDeleteScp from "../form/FormArticleDeleteScp";
import CustomModal from "./CustomModal";

export default function ModalArticleEditScp({ modalVariant, open, close, article }) {
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

  const modalChildren = (
    <Box>
      <Group justify="center" gap="sm" mb="sm">
        <Button w="140px" onClick={handleAddArticleScp}>
          Привязать scp
        </Button>
        <Button w="140px" onClick={handleDeleteArticleScp}>
          Отвязать scp
        </Button>
      </Group>

      {addArticleScp && <FormArticleAddScp articleId={article.articleId} closeModal={close} />}
      {deleteArticleScp && <FormArticleDeleteScp article={article} closeModal={close} />}
    </Box>
  );

  return (
    <CustomModal
      modalVariant={modalVariant}
      children={modalChildren}
      title="Изменение Scp в статье"
      opened={open}
      onClose={close}
    />
  );
}
