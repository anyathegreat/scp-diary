import { Button, Modal, Skeleton, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getArticles } from "../store/articleList/slice";

import ArticleCard from "../components/CardArticleScp";
import FormArticleScp from "../components/form/FormAddArticle";

export default function ArticleListPage() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.articleList.list);
  const { loading } = useSelector((state) => state.articleList);

  const [modalAddArticle, setModalAddArticle] = useState(false);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const handleModalAddArticle = () => {
    setModalAddArticle((prev) => !prev);
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
      <Button onClick={handleModalAddArticle}>Добавить статью</Button>

      {modalAddArticle && (
        <Modal
          size="lg"
          opened={modalAddArticle}
          onClose={handleModalAddArticle}
          title="Для создания статьи напишите её название"
          centered
        >
          <FormArticleScp handleCloseModal={handleModalAddArticle} />
        </Modal>
      )}

      {articles.map((item) => {
        return <ArticleCard key={`article-${item.articleId}`} article={item} />;
      })}
    </Stack>
  );
}
