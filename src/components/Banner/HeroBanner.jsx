import { getImageUrl } from "../../utils/imageUtils";

const HeroBanner = ({ item, onBoxClicked, onIncreaseIndex, getTitle, getItemType }) => {
  if (!item) return null;

  const handleDetailsClick = (e) => {
    e.stopPropagation(); 
    onBoxClicked(item.id, getItemType(item));
  };
  
  return (
    <div
      onClick={onIncreaseIndex}
      className="h-screen flex flex-col justify-center px-16 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${getImageUrl(item.backdrop_path || "", "original")})`
      }}
    >
      <div 
        onClick={handleDetailsClick} 
        className="w-1/2 cursor-pointer group"
      >
        <h2 className="text-6xl mb-5 text-white font-light group-hover:text-gray-300 transition-colors">
          {getTitle(item)}
        </h2>
        <p className="text-3xl text-white font-light line-clamp-4 group-hover:text-gray-300 transition-colors">
          {item.overview}
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;

