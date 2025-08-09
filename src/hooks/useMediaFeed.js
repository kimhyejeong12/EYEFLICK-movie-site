import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useQueries } from "react-query";
import { getMoviesByCategory } from "../services/api/movieApi";
import { getTvByCategory } from "../services/api/tvApi";

// 홈/카테고리 통합 훅
export const useMediaFeed = () => {
  const location = useLocation();
  const { type: routeType, category: routeCategory } = useParams();
  const normalizedType = routeType === "tv" ? "tv" : "movie";

  const isHomePage = location.pathname === "/";

  // 카테고리 결정 단순화:
  const category = routeCategory || (normalizedType === "tv" ? "popular" : "now_playing");

  // 홈 병렬 쿼리
  const homeQueries = [
    {
      queryKey: ["movies", "now_playing"],
      queryFn: () => getMoviesByCategory("now_playing"),
    },
    {
      queryKey: ["tv", "popular"],
      queryFn: () => getTvByCategory("popular"),
    },
  ];

  const [
    { data: movieData, isLoading: movieLoading } = { data: { results: [] }, isLoading: false },
    { data: tvData, isLoading: tvLoading } = { data: { results: [] }, isLoading: false },
  ] = useQueries(
    homeQueries.map((query) => ({
      ...query,
      enabled: isHomePage,
      initialData: { results: [] },
    }))
  );

  // 홈 데이터 셔플
  const shuffledData = useMemo(() => {
    const combined = [
      ...(movieData?.results || []).slice(0, 10),
      ...(tvData?.results || []).slice(0, 10),
    ];

    for (let i = combined.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    return { results: combined };
  }, [movieData, tvData]);

  // 카테고리 단일 쿼리
  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    [normalizedType, category],
    () => (normalizedType === "tv" ? getTvByCategory(category) : getMoviesByCategory(category)),
    { enabled: !isHomePage }
  );
  //최종 결과 반환 로직 통합
  const finalData = isHomePage ? shuffledData : categoryData;
  const finalLoading = isHomePage ? Boolean(movieLoading || tvLoading) : categoryLoading;
  const finalCategory = isHomePage ? "home" : category;

  return { data: finalData, isLoading: finalLoading, category: finalCategory, type: normalizedType };
};

