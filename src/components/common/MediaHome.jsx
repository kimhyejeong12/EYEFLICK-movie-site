import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useMediaFeed } from "../../hooks/useMediaFeed";
import { useBannerLogic } from "../../hooks/useBannerLogic";
import ErrorBoundary from "./ErrorBoundary";
import MediaGrid from "./MediaGrid";
import MediaBanner from "../Banner/MediaBanner";
import MediaModal from "./MediaModal";

const MediaHome = ({ type = "movie" }) => {
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  
  // 통합 데이터 훅 사용
  const { data, isLoading, category: resolvedCategory, type: resolvedType } = useMediaFeed();
  
  const bannerLogic = useBannerLogic(data, isHomePage ? "mixed" : resolvedType);
  
  // URL에서 ID 파라미터 추출
  const idMatch = location.pathname.match(new RegExp(`/${resolvedType === "tv" ? "tv-detail" : "movie"}/(\\d+)`));
  const bigMatch = idMatch ? { params: { id: idMatch[1] } } : null;
  
  const clickedItem = bigMatch?.params.id && 
    data?.results.find((item) => item.id === +bigMatch.params.id);
    
  return (
    <ErrorBoundary isLoading={isLoading}>
      <div className="bg-black">
        <MediaBanner 
          data={data}
          index={bannerLogic.index}
          leaving={bannerLogic.leaving}
          onIncreaseIndex={bannerLogic.increaseIndex}
          onBoxClicked={bannerLogic.onBoxClicked}
          onToggleLeaving={bannerLogic.toggleLeaving}
          offset={bannerLogic.offset}
          type={isHomePage ? "mixed" : resolvedType}
        />
        
        {/* 그리드 섹션 */}
        {isHomePage ? (
          <div>
            <MediaGrid category="now_playing" title="인기 영화" />
            <MediaGrid category="popular" type="tv" title="인기 TV 프로그램" />
          </div>
        ) : (
          <MediaGrid category={resolvedCategory} type={resolvedType} />
        )}
        
        <AnimatePresence>
          <MediaModal
            isOpen={!!bigMatch}
            onClose={bannerLogic.onOverlayClick}
            item={clickedItem}
            type={clickedItem?.name ? "tv" : "movie"}
          />
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

export default MediaHome;
