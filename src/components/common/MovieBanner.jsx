import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "../../utils/imageUtils";

const rowVariants = {
  hidden: {
    x: typeof window !== 'undefined' ? window.outerWidth + 5 : 1000,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: typeof window !== 'undefined' ? -window.outerWidth - 5 : -1000,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const MovieBanner = ({ data, index, leaving, onIncreaseIndex, onBoxClicked, onToggleLeaving, offset = 6 }) => {
  return (
    <>
      <div
        onClick={onIncreaseIndex}
        className="h-screen flex flex-col justify-center px-16 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${getImageUrl(data?.results[0].backdrop_path || "", "original")})`
        }}
      >
        <h2 className="text-6xl mb-5 text-white font-light">{data?.results[0].title}</h2>
        <p className="text-3xl w-1/2 text-white font-light">{data?.results[0].overview}</p>
      </div>
      
      <div className="relative -top-24">
        <AnimatePresence initial={false} onExitComplete={onToggleLeaving}>
          <motion.div
            className="grid gap-1 grid-cols-6 absolute w-full"
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <motion.div
                  layoutId={movie.id + ""}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  onClick={() => onBoxClicked(movie.id)}
                  transition={{ type: "tween" }}
                  className="bg-white h-48 text-6xl cursor-pointer bg-cover bg-center first:origin-center-left last:origin-center-right"
                  style={{
                    backgroundImage: `url(${getImageUrl(movie.backdrop_path, "w500")})`
                  }}
                >
                  <motion.div
                    variants={infoVariants}
                    className="p-2 bg-gray-800 opacity-0 absolute w-full bottom-0"
                  >
                    <h4 className="text-center text-lg text-white font-light">{movie.title}</h4>
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default MovieBanner;
