import { motion, useScroll } from "framer-motion";
import { getImageUrl } from "../../utils/imageUtils";

const MediaModal = ({ 
  isOpen, 
  onClose, 
  item, 
  layoutId, 
  type = "movie" 
}) => {
  const { scrollY } = useScroll();
  
  if (!isOpen || !item) return null;
  
  return (
    <>
      <motion.div
        onClick={onClose}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 w-full h-full bg-black bg-opacity-50 opacity-0 z-50"
      />
      <motion.div
        style={{ top: scrollY.get() + 100 }}
        layoutId={layoutId}
        className="absolute w-2/5 h-4/5 left-0 right-0 mx-auto rounded-2xl overflow-hidden bg-gray-800 z-50"
      >
        <div
          className="w-full h-96 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, black, transparent), url(${getImageUrl(
              item.backdrop_path,
              "w500"
            )})`,
          }}
        />
        <h3 className="text-white p-5 text-4xl relative -top-20">
          {type === "tv" ? item.name : item.title}
        </h3>
        <p className="p-5 relative -top-20 text-white">{item.overview}</p>
      </motion.div>
    </>
  );
};

export default MediaModal;
