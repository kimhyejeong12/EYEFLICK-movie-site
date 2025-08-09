import { motion } from "framer-motion";
import { getImageUrl } from "../../utils/imageUtils";

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -60,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      restDelta: 0.5,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      restDelta: 0.5,
    },
  },
};

const SliderItem = ({ item, onBoxClicked, getTitle, getItemType }) => (
  <motion.div
    layoutId={item.id + ""}
    key={item.id}
    whileHover="hover"
    initial="normal"
    variants={boxVariants}
    onClick={() => onBoxClicked(item.id, getItemType(item))}
    className="relative h-32 cursor-pointer first:origin-center-left last:origin-center-right overflow-visible"
  >
    <img
      src={getImageUrl(item.backdrop_path, "w500")}
      alt={getTitle(item)}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/300x160/333/666?text=No+Image';
      }}
    />
    <motion.div
      variants={infoVariants}
      className="p-2 opacity-0 absolute w-full bottom-0 z-10 bg-gradient-to-t from-violet-900/80 via-fuchsia-800/50 to-transparent"
    >
      <h4 className="text-center text-lg text-white font-light">{getTitle(item)}</h4>
    </motion.div>
  </motion.div>
);

export default SliderItem;

