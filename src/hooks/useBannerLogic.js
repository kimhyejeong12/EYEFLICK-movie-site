import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useBannerLogic = (data, type = "movie") => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 6;
  
  // 배너 인덱스 증가 함수
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalItems = data.results.length - 1;
      const maxIndex = Math.floor(totalItems / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  
  // 애니메이션 상태 토글 함수
  const toggleLeaving = () => setLeaving((prev) => !prev);
  
  // 아이템 클릭 핸들러
  const onBoxClicked = (itemId, itemType = type) => {
    if (itemType === 'tv') {
      navigate(`/tv-detail/${itemId}`);
    } else {
      navigate(`/movie/${itemId}`);
    }
  };
  
  // 오버레이 클릭 핸들러
  const onOverlayClick = () => {
    const category = type === "tv" ? "popular" : "now_playing";
    if (type === "tv") {
      navigate(`/tv/${category}`);
    } else if (type === "movie") {
      navigate(`/movies/${category}`);
    } else {
      navigate("/");
    }
  };
  
  return {
    index,
    leaving,
    offset,
    increaseIndex,
    toggleLeaving,
    onBoxClicked,
    onOverlayClick
  };
};
