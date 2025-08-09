import { motion, useScroll, useTransform } from "framer-motion";
import { createPortal } from "react-dom";
import { getImageUrl } from "../../utils/imageUtils";

const MediaModal = ({
  isOpen,
  onClose,
  item,
  type = "movie",
}) => {
  const { scrollY } = useScroll();
  const top = useTransform(scrollY, (value) => value + 100);

  if (!isOpen || !item) return null;

  return createPortal(
    <>
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-[50]"
      />
      <motion.div
        style={{ top }}
        className="fixed w-full max-w-2xl left-0 right-0 mx-auto rounded-xl bg-neutral-800 z-[60] shadow-xl max-h-[85vh] overflow-y-auto"
      >
        <div className="relative">
          <div
            className="w-full pt-[56.25%] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to top, #181818, transparent 50%), url(${getImageUrl(
                item.backdrop_path,
                "w500"
              )})`,
            }}
          />
          <h3 className="text-white text-2xl md:text-4xl font-bold absolute bottom-8 px-6 md:px-10">
            {type === "tv" ? item.name : item.title}
          </h3>
        </div>
      </motion.div>
    </>,
    document.body
  );
};

export default MediaModal;
