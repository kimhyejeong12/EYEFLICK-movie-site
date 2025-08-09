import { useQuery } from "react-query";
import { getMovieReviews, getTvReviews } from "../services/api/reviewApi";

export function useReviews({ itemId, type, existingReviews = [] }) {
  return useQuery(
    ["reviews", itemId, type],
    async () => {
      const fetchByType = type === "tv" ? getTvReviews : getMovieReviews;

      const [koResponse, enResponse] = await Promise.all([
        fetchByType(itemId, "ko-KR", 1),
        fetchByType(itemId, "en", 1),
      ]);

      const koreanReviews = koResponse?.results || [];
      const englishReviews = enResponse?.results || [];

      // Set 기반 중복 제거: 한국어 리뷰 id 집합을 만들어 영어 리뷰에서 제외
      const koreanIds = new Set(koreanReviews.map((r) => r.id));
      const uniqueEnglish = englishReviews.filter((r) => !koreanIds.has(r.id));
      const merged = [...koreanReviews, ...uniqueEnglish];

      return merged.slice(0, 10);
    },
    {
      enabled: Boolean(itemId) && existingReviews.length < 3,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );
}

