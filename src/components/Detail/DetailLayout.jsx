import { motion } from "framer-motion";
import { mapMediaData } from "../../utils/mediaDataMapper";
import { detailPageVariants as variants } from "../../utils/animations";

import PrimaryDetails from "../../components/Detail/PrimaryDetails";

const MediaDetailLayout = ({ data, type = "movie", children }) => {
  const media = mapMediaData(data || {}, type);

  return (
    <div className="bg-black min-h-screen">
      <div
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${media.backdropUrl})`,
        }}
      />

      <div className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div className="flex flex-col" variants={variants.container} initial="initial" animate="animate">
            <PrimaryDetails media={media} variants={variants} />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MediaDetailLayout;

