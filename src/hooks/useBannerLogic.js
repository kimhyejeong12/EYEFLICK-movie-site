import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useBannerLogic = (data, type = "movie") => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 6;
  
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalItems = data.results.length - 1;
      const maxIndex = Math.floor(totalItems / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  
  const toggleLeaving = () => setLeaving((prev) => !prev);
  
  const onBoxClicked = (itemId, itemType = type) => {
    if (itemType === 'tv') {
      navigate(`/tv-detail/${itemId}`);
    } else {
      navigate(`/movie/${itemId}`);
    }
  };
  
  const onOverlayClick = () => {
    const category = type === "tv" ? "popular" : "now_playing";
    if (type === "tv") {
      navigate("/tv");
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
