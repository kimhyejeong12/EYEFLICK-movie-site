import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../services/api/movieApi";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import DetailLayout from "../../components/Detail/DetailLayout";
import InfoSection from "../../components/Detail/InfoSection";
import TrailerSection from "../../components/Detail/TrailerSection";
import ReviewsSection from "../../components/Reviews/ReviewsSection";
import RecommendationsSection from "../../components/Detail/RecommendationsSection";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  
  const { data: movieData, isLoading, error } = useQuery(
    ["movieDetail", movieId],
    () => getMovieDetail(movieId)
  );

  return (
    <ErrorBoundary 
      isLoading={isLoading} 
      error={error}
      notFoundMessage="영화를 찾을 수 없습니다"
    >
      <DetailLayout data={movieData} type="movie">
        <InfoSection data={movieData} type="movie" />
        <TrailerSection data={movieData} type="movie" />
        <ReviewsSection data={movieData} type="movie" />
        <RecommendationsSection data={movieData} type="movie" />
      </DetailLayout>
    </ErrorBoundary>
  );
};

export default MovieDetailPage;

