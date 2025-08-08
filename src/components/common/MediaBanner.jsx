import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "../../utils/imageUtils";

const rowVariants = {
  hidden: { x: typeof window !== 'undefined' ? window.outerWidth + 5 : 1000 },
  visible: { x: 0 },
  exit: { x: typeof window !== 'undefined' ? -window.outerWidth - 5 : -1000 },
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -60,
    transition: { delay: 0.5, duration: 0.1, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.1, type: "tween" },
  },
};

const MediaBanner = ({ 
  data, 
  index, 
  onIncreaseIndex, 
  onBoxClicked, 
  onToggleLeaving, 
  offset = 6, 
  type = "movie" 
}) => {
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

  if (!data?.results?.length) return null;

  const firstItem = data.results[0];
  const items = data.results.slice(1).slice(offset * index, offset * index + offset);

  const handleItemClick = (item) => onBoxClicked(item.id, getItemType(item));

  return (
    <>
      {/* 메인 배너 섹션 */}
      <div
        onClick={onIncreaseIndex}
        className="h-screen flex flex-col justify-center px-16 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${getImageUrl(firstItem.backdrop_path || "", "original")})`
        }}
      >
        <h2 
          className="text-6xl mb-5 text-white font-light cursor-pointer hover:text-gray-300 transition-colors"
          onClick={() => handleItemClick(firstItem)}
        >
          {getTitle(firstItem)}
        </h2>
        <p 
          className="text-3xl w-1/2 text-white font-light line-clamp-4 cursor-pointer hover:text-gray-300 transition-colors"
          onClick={() => handleItemClick(firstItem)}
        >
          {firstItem.overview}
        </p>
      </div>
      
      {/* 영화 카드 그리드 섹션 */}
      <div className="relative -top-16 mb-20">
        <AnimatePresence initial={false} onExitComplete={onToggleLeaving}>
          <motion.div
            className="grid gap-1 grid-cols-6 absolute w-full px-16"
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {items.map((item) => (
              <motion.div
                layoutId={item.id + ""}
                key={item.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                onClick={() => handleItemClick(item)}
                transition={{ type: "tween" }}
                className="relative h-32 cursor-pointer first:origin-center-left last:origin-center-right overflow-visible"
              >
                <img
                  src={getImageUrl(item.backdrop_path, "w500")}
                  alt={getTitle(item)}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x160/333/666?text=No+Image';
                  }}
                />
                <motion.div
                  variants={infoVariants}
                  className="p-2 bg-gray-800 opacity-0 absolute w-full bottom-0 z-10 rounded-b-md"
                >
                  <h4 className="text-center text-lg text-white font-light">
                    {getTitle(item)}
                  </h4>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default MediaBanner;
