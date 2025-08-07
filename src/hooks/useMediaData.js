import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getMoviesByCategory } from "../services/api/movieApi";
import { getTvByCategory } from "../services/api/tvApi";

export const useMediaData = (type = "movie", defaultCategory = "popular") => {
  const location = useLocation();
  
  // URL에서 카테고리 추출
  const categoryMatch = location.pathname.match(new RegExp(`/${type === "tv" ? "tv" : "movies"}/(\\w+)`));
  const category = categoryMatch ? categoryMatch[1] : defaultCategory;
  
  const { data, isLoading, error } = useQuery(
    [type, category],
    () => type === "tv" ? getTvByCategory(category) : getMoviesByCategory(category)
  );
  
  return { data, isLoading, error, category };
};

export const useHomeData = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const { data: movieData, isLoading: movieLoading } = useQuery(
    ["movies", "now_playing"],
    () => getMoviesByCategory("now_playing"),
    { enabled: isHomePage }
  );
  
  const { data: tvData, isLoading: tvLoading } = useQuery(
    ["tv", "popular"],
    () => getTvByCategory("popular"),
    { enabled: isHomePage }
  );
  
  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    ["movies", "now_playing"],
    () => getMoviesByCategory("now_playing"),
    { enabled: !isHomePage }
  );
  
  const { data, isLoading } = isHomePage ? {
    data: movieData && tvData ? {
      results: [
        ...movieData.results.slice(0, 10),
        ...tvData.results.slice(0, 10)
      ].sort(() => Math.random() - 0.5)
    } : null,
    isLoading: movieLoading || tvLoading
  } : {
    data: categoryData,
    isLoading: categoryLoading
  };
  
  return { data, isLoading, isHomePage };
};
