import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      // Состояния напрямую изменять нельзя, поэтому развернем посты в новый массив и отсортируем его
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]); // Следим за выбранным алгоритмом сортировки и массивом постов (если добавлен новый элемент, массив также нужно отсортировать)

  return sortedPosts;
};

// Хук, который сортирует и фильтрует посты
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  // Теперь в sortedPosts лежит отсортированный массив, при это массив posts не изменяется
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
