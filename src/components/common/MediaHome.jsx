import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useMediaData, useHomeData } from "../../hooks/useMediaData";
import { useBannerLogic } from "../../hooks/useBannerLogic";
import ErrorBoundary from "./ErrorBoundary";
import MediaGrid from "./MediaGrid";
import MediaBanner from "./MediaBanner";
import MediaModal from "./MediaModal";

const MediaHome = ({ type = "movie" }) => {
  const location = useLocation();
  
  // 홈 페이지인지 확인
  const isHomePage = location.pathname === '/';
  
  // 데이터 가져오기
  const homeData = useHomeData();
  const mediaData = useMediaData(type, type === "tv" ? "popular" : "now_playing");
  
  const { data, isLoading } = isHomePage ? homeData : mediaData;
  const { category } = mediaData;
  
  const bannerLogic = useBannerLogic(data, isHomePage ? "mixed" : type);
  
  // URL에서 ID 파라미터 추출
  const idMatch = location.pathname.match(new RegExp(`/${type === "tv" ? "tv" : "movies"}/(\\d+)`));
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
          type={isHomePage ? "mixed" : type}
        />
        
        {/* 그리드 섹션 */}
        {isHomePage ? (
          <div>
            <MediaGrid category="now_playing" title="인기 영화" />
            <MediaGrid category="popular" type="tv" title="인기 TV 프로그램" />
          </div>
        ) : (
          <MediaGrid category={category} type={type} />
        )}
        
        <AnimatePresence>
          <MediaModal
            isOpen={!!bigMatch}
            onClose={bannerLogic.onOverlayClick}
            item={clickedItem}
            layoutId={bigMatch?.params.id}
            type={clickedItem?.name ? "tv" : "movie"}
          />
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

export default MediaHome;
