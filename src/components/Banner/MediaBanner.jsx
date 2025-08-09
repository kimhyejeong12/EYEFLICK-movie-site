import HeroBanner from "./HeroBanner";
import Slider from "./Slider";

const MediaBanner = ({ data, index, leaving, onIncreaseIndex, onBoxClicked, onToggleLeaving, offset = 6, type = "movie" }) => {
  // 헬퍼 함수
  const getTitle = (item) => {
    if (type === "tv") return item.name;
    if (type === "mixed") return item.name || item.title;
    return item.title;
  };

  const getItemType = (item) => {
    if (type === "tv") return "tv";
    if (type === "mixed") return item.name ? "tv" : "movie";
    return "movie";
  };

  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  if (!data?.results?.length) return null;

  const [firstItem, ...restItems] = data.results;
  const sliderItems = restItems.slice(offset * index, offset * index + offset);

  return (
    <>
      <HeroBanner
        item={firstItem}
        onBoxClicked={onBoxClicked}
        onIncreaseIndex={onIncreaseIndex}
        getTitle={getTitle}
        getItemType={getItemType}
      />

      <Slider
        items={sliderItems}
        indexKey={index}
        onToggleLeaving={onToggleLeaving}
        onBoxClicked={onBoxClicked}
        getTitle={getTitle}
        getItemType={getItemType}
        windowWidth={windowWidth}
      />
    </>
  );
};

export default MediaBanner;

