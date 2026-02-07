import { Button, Modal, Skeleton, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getArticles } from "../store/articleList/slice";

import CardArticle from "../components/CardArticle";
import ModalAddArticle from "../components/modal/ModalAddArticle";

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

      {articles.map((item) => {
        return <CardArticle key={`article-${item.articleId}`} article={item} />;
      })}

      {modalAddArticle && (
        <ModalAddArticle typeVisible="visibleFrom" open={modalAddArticle} close={handleModalAddArticle} />
      )}

      {modalAddArticle && (
        <ModalAddArticle typeVisible="hiddenFrom" open={modalAddArticle} close={handleModalAddArticle} />
      )}
    </Stack>
  );
}
