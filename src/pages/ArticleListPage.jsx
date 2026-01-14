import { Button, Modal, Skeleton, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getArticles } from "../store/articleList/slice";

import ArticleCard from "../components/CardArticleScp";
import FormArticleScp from "../components/FormArticleScp";

export default function ArticleListPage() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.articleList.list);
  const { loading } = useSelector((state) => state.articleList);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (loading) {
    return (
      <Stack align="center" gap="md">
        <Skeleton height={100} w="70%" />
        <Skeleton height={100} w="70%" />
        <Skeleton height={100} w="70%" />
        <Skeleton height={100} w="70%" />
        <Skeleton height={100} w="70%" />
      </Stack>
    );
  }

  return (
    <Stack align="center">
      <Button onClick={handleOpenModal} color="brown.0">
        Добавить статью
      </Button>

      <Modal
        size="lg"
        opened={openModal}
        onClose={handleCloseModal}
        title="Для создания статьи напишите её название"
        centered
      >
        {openModal && <FormArticleScp handleCloseModal={handleCloseModal} />}
      </Modal>

      {articles.map((item) => {
        return <ArticleCard key={`article-${item.articleId}`} article={item} />;
      })}
    </Stack>
  );
}
