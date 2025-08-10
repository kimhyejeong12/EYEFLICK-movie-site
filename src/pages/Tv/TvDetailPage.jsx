import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTvDetail } from "../../services/api/tvApi";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import DetailLayout from "../../components/Detail/DetailLayout";
import InfoSection from "../../components/Detail/InfoSection";
import TrailerSection from "../../components/Detail/TrailerSection";
import ReviewsSection from "../../components/Reviews/ReviewsSection";
import RecommendationsSection from "../../components/Detail/RecommendationsSection";

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
      <DetailLayout data={tvData} type="tv">
        <InfoSection data={tvData} type="tv" />
        <TrailerSection data={tvData} type="tv" />
        <ReviewsSection data={tvData} type="tv" />
        <RecommendationsSection data={tvData} type="tv" />
      </DetailLayout>
    </ErrorBoundary>
  );
};

export default TvDetailPage;

