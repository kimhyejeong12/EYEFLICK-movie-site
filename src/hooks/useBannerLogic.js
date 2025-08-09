import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useBannerLogic = (data, type = "movie") => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 6;

  // type에 따라 기본 경로를 미리 정의
  const detailPath = type === "tv" ? "/tv-detail" : "/movie";
  const listPath = type === "tv" ? "/tv/popular" : "/movies/now_playing";

  const toggleLeaving = useCallback(() => {
    setLeaving((prev) => !prev);
  }, []);

  const increaseIndex = useCallback(() => {
    if (!data || leaving) return;
    
    toggleLeaving();
    const totalItems = data.results.length - 1;
    const maxIndex = Math.floor(totalItems / offset) - 1;
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [data, leaving, offset, toggleLeaving]);

  // 아이템 클릭 핸들러 (더 단순해짐)
  const onBoxClicked = useCallback((itemId) => {
    navigate(`${detailPath}/${itemId}`);
  }, [navigate, detailPath]);
  
  // 오버레이 클릭 핸들러 (더 단순해짐)
  const onOverlayClick = useCallback(() => {
    navigate(listPath);
  }, [navigate, listPath]);

  return {
    index,
    leaving,
    offset,
    increaseIndex,
    toggleLeaving,
    onBoxClicked,
    onOverlayClick,
  };
};
