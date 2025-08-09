import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../services/api/movieApi";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import MediaDetailLayout from "../../components/common/MediaDetailLayout";
import MediaInfoSection from "../../components/common/MediaInfoSection";
import TrailerSection from "../../components/common/TrailerSection";
import ReviewsSection from "../../components/common/reviews/ReviewsSection";
import RecommendationsSection from "../../components/common/RecommendationsSection";

const MovieDetail = () => {
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
      <MediaDetailLayout data={movieData} type="movie">
        <MediaInfoSection data={movieData} type="movie" />
        <TrailerSection data={movieData} type="movie" />
        <ReviewsSection data={movieData} type="movie" />
        <RecommendationsSection data={movieData} type="movie" />
      </MediaDetailLayout>
    </ErrorBoundary>
  );
};

export default MovieDetail;
