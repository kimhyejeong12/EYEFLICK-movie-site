import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useBannerLogic = (data, type = "movie") => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 6;

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

  const onBoxClicked = useCallback((itemId, itemType) => {
    const targetType = itemType || type;
    const targetDetailPath = targetType === "tv" ? "/tv-detail" : "/movie";
    navigate(`${targetDetailPath}/${itemId}`);
  }, [navigate, type]);
  
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
