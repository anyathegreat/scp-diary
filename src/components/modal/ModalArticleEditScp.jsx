import { useState } from "react";
import { Box, Button, Group, Modal } from "@mantine/core";

import ModalTypeVisible from "./ModalTypeVisible";
import FormArticleAddScp from "../form/FormArticleAddScp";
import FormArticleDeleteScp from "../form/FormArticleDeleteScp";

export default function ModalArticleEditScp({ typeVisible, open, close, article }) {
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
        <Button onClick={handleAddArticleScp}>Привязать scp</Button>
        <Button onClick={handleDeleteArticleScp}>Отвязать scp</Button>
      </Group>

      {addArticleScp && <FormArticleAddScp articleId={article.articleId} closeModal={close} />}
      {deleteArticleScp && <FormArticleDeleteScp article={article} closeModal={close} />}
    </Box>
  );

  return (
    <ModalTypeVisible
      typeVisible={typeVisible}
      children={modalChildren}
      title="Изменение Scp в статье"
      open={open}
      close={close}
    />
  );
}
