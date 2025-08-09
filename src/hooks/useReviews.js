import { useQuery } from "react-query";
import { getMovieReviews, getTvReviews } from "../services/api/reviewApi";

export function useReviews({ itemId, type, existingReviews = [] }) {
  const { data: reviews = [], isLoading, error } = useQuery(
    ["reviews", itemId, type],
    async () => {
      const fetchByType = type === "tv" ? getTvReviews : getMovieReviews;
      const [koResponse, enResponse] = await Promise.all([
        fetchByType(itemId, "ko-KR", 1),
        fetchByType(itemId, "en", 1),
      ]);

      if (!koResponse || !enResponse) {
        throw new Error("리뷰 데이터를 불러오는 데 실패했습니다.");
      }

      return [koResponse, enResponse];
    },
    {
      enabled: Boolean(itemId) && existingReviews.length < 3,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      select: (responses) => {
        const [koResponse, enResponse] = responses || [];
        const koreanReviews = koResponse?.results || [];
        const englishReviews = enResponse?.results || [];

        const koreanIds = new Set(koreanReviews.map((r) => r.id));
        const uniqueEnglish = englishReviews.filter((r) => !koreanIds.has(r.id));
        const merged = [...koreanReviews, ...uniqueEnglish];
        return merged.slice(0, 10);
      },
    }
  );

  return { reviews, isLoading, error };
}

