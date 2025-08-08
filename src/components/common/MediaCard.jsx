import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUtils";

const MediaCard = ({ item, type = "movie" }) => {
  const getTitle = () => type === "tv" ? item.name : item.title;
  const getDate = () => type === "tv" ? item.first_air_date : item.release_date;
  const getLink = () => type === "tv" ? `/tv-detail/${item.id}` : `/movie/${item.id}`;

  return (
    <Link 
      to={getLink()} 
      className="group block relative overflow-hidden rounded-md transition-transform duration-300 hover:scale-105"
    >
      <img
        src={getImageUrl(item.poster_path, "w500")}
        alt={getTitle()}
        className="w-full h-auto"
      />
      
      {/* 호버 오버레이 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 
                   transition-all duration-300 flex flex-col justify-end p-4 
                   transform translate-y-full group-hover:translate-y-0"
      >
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
          {getTitle()}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-300">
          <span>{getDate() ? new Date(getDate()).getFullYear() : 'N/A'}</span>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{item.vote_average?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
