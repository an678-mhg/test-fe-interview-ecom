import { useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({
  loading,
  hasMore,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  return { lastElementRef };
};
