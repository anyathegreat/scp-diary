import { Button, Skeleton, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getArticles } from "../store/scpArticles/slice";
import ArticleCard from "../components/CardArticleScp";

export default function ScpArticlePage() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.scpArticles.list);
  const { loading } = useSelector((state) => state.scpArticles);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

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
      <Button>Добавить статью</Button>
      {articles.map((item) => {
        return <ArticleCard key={`article-${item.id}`} articles={item} />;
      })}
    </Stack>
  );
}
