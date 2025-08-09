import { motion, AnimatePresence } from "framer-motion";
import SliderItem from "./SliderItem";

const rowVariants = {
  hidden: (custom) => ({ x: custom > 0 ? custom + 5 : 1000 }),
  visible: { x: 0 },
  exit: (custom) => ({ x: custom < 0 ? custom - 5 : -1000 }),
};

const Slider = ({ items, indexKey, onToggleLeaving, onBoxClicked, getTitle, getItemType, windowWidth }) => (
  <div className="relative -top-16 mb-20">
    <AnimatePresence initial={false} onExitComplete={onToggleLeaving} custom={windowWidth}>
      <motion.div
        className="grid gap-1 grid-cols-6 absolute w-full px-16"
        variants={rowVariants}
        custom={windowWidth}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "tween", duration: 1 }}
        key={indexKey}
      >
        {items.map((item) => (
          <SliderItem
            key={item.id}
            item={item}
            onBoxClicked={onBoxClicked}
            getTitle={getTitle}
            getItemType={getItemType}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
);

export default Slider;

