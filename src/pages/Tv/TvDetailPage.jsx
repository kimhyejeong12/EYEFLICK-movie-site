import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTvDetail } from "../../services/api/tvApi";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import MediaDetailLayout from "../../components/common/MediaDetailLayout";
import MediaInfoSection from "../../components/common/MediaInfoSection";
import TrailerSection from "../../components/common/TrailerSection";
import ReviewsSection from "../../components/Reviews/ReviewsSection";
import RecommendationsSection from "../../components/common/RecommendationsSection";

const TvDetailPage = () => {
  const { tvId } = useParams();
  
  const { data: tvData, isLoading, error } = useQuery(
    ["tvDetail", tvId],
    () => getTvDetail(tvId)
  );

  return (
    <ErrorBoundary 
      isLoading={isLoading} 
      error={error}
      notFoundMessage="TV 프로그램을 찾을 수 없습니다"
    >
      <MediaDetailLayout data={tvData} type="tv">
        <MediaInfoSection data={tvData} type="tv" />
        <TrailerSection data={tvData} type="tv" />
        <ReviewsSection data={tvData} type="tv" />
        <RecommendationsSection data={tvData} type="tv" />
      </MediaDetailLayout>
    </ErrorBoundary>
  );
};

export default TvDetailPage;

