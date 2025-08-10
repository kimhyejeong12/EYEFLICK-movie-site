import { useQuery } from "react-query";
import { getMovieReviews, getTvReviews } from "../services/api/reviewApi";

export function useReviews({ itemId, type, existingReviews = [] }) {
  const { data: reviews = [], isLoading, error } = useQuery(
    ["reviews", itemId, type],
    async () => {
      const fetchByType = type === "tv" ? getTvReviews : getMovieReviews;

      const [koResponse, enResponse] = await Promise.all([
        fetchByType(itemId, "ko-KR", 1),
        fetchByType(itemId, "en-US", 1),
      ]);

      return [koResponse, enResponse];
    },
    {
      enabled: Boolean(itemId) && existingReviews.length < 3,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      select: (data) => {
        const [koResponse, enResponse] = data;
        const koreanReviews = koResponse?.results || [];
        const englishReviews = enResponse?.results || [];

        const koreanReviewIds = new Set(koreanReviews.map(review => review.id));
        const uniqueEnglishReviews = englishReviews.filter(
          review => !koreanReviewIds.has(review.id)
        );

        const allReviews = [...koreanReviews, ...uniqueEnglishReviews];
        return allReviews.slice(0, 10);
      },
    }
  );

  return { reviews, isLoading, error };
}

