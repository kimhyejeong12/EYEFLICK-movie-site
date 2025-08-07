import { motion } from "framer-motion";
import { getImageUrl } from "../../utils/imageUtils";

// 헬퍼 함수들
const getTitle = (data, type) => type === "tv" ? data.name : data.title;
const getDate = (data, type) => type === "tv" ? data.first_air_date : data.release_date;
const getRuntime = (data, type) => {
  if (type === "tv") return data.number_of_seasons ? `${data.number_of_seasons} 시즌` : null;
  return data.runtime > 0 ? `${Math.floor(data.runtime / 60)}시간 ${data.runtime % 60}분` : null;
};
const getStatus = (data, type) => {
  if (type === "tv") {
    return data.status === 'Returning Series' ? '방영 중' : 
           data.status === 'Ended' ? '종영' : data.status;
  }
  return data.status === 'Released' ? '개봉' : 
         data.status === 'Post Production' ? '후반 작업' : data.status;
};
const getStatusColor = (data, type) => {
  if (type === "tv") {
    return data.status === 'Returning Series' ? 'bg-green-600' : 
           data.status === 'Ended' ? 'bg-red-600' : 'bg-gray-600';
  }
  return data.status === 'Released' ? 'bg-green-600' : 
         data.status === 'Post Production' ? 'bg-yellow-600' : 'bg-gray-600';
};
const getCredits = (data, type) => {
  if (type === "tv") return data.created_by || [];
  return data.credits?.crew?.filter(crew => 
    crew.job === 'Director' || crew.job === 'Producer'
  ).slice(0, 5) || [];
};

// 포스터 컴포넌트
const PosterSection = ({ data, type }) => (
  <div className="lg:w-1/3">
    <motion.img
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      src={getImageUrl(data.poster_path, "w500")}
      alt={getTitle(data, type)}
      className="w-full rounded-lg shadow-2xl"
    />
  </div>
);

// 메타 정보 컴포넌트
const MetaInfo = ({ data, type }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="flex flex-wrap items-center gap-4 mb-6 text-gray-300"
  >
    {getDate(data, type) && <span>{new Date(getDate(data, type)).getFullYear()}</span>}
    {getRuntime(data, type) && <span>{getRuntime(data, type)}</span>}
    {data.vote_average > 0 && <span className="flex items-center">⭐ {data.vote_average.toFixed(1)}</span>}
    {data.status && (
      <span className={`px-2 py-1 rounded text-sm ${getStatusColor(data, type)}`}>
        {getStatus(data, type)}
      </span>
    )}
  </motion.div>
);

// 장르 컴포넌트
const GenreSection = ({ data }) => (
  data.genres && data.genres.length > 0 && (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="flex flex-wrap gap-2 mb-6"
    >
      {data.genres.map((genre) => (
        <span key={genre.id} className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
          {genre.name}
        </span>
      ))}
    </motion.div>
  )
);

// 제작진 컴포넌트
const CreditsSection = ({ data, type }) => {
  const credits = getCredits(data, type);
  return credits.length > 0 && (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="mb-6"
    >
      <h3 className="text-white font-semibold mb-2">제작진</h3>
      <div className="flex flex-wrap gap-2">
        {credits.map((credit) => (
          <span key={credit.id} className="text-gray-300">
            {credit.name} {credit.job && `(${credit.job})`}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const MediaDetailLayout = ({ data, type = "movie", children }) => {
  return (
    <div className="bg-black min-h-screen">
      {/* 배경 이미지 */}
      <div 
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${getImageUrl(data.backdrop_path, "original")})`,
        }}
      />
      
      {/* 메인 콘텐츠 */}
      <div className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            <PosterSection data={data} type={type} />
            
            {/* 정보 */}
            <div className="lg:w-2/3">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl lg:text-6xl font-bold text-white mb-4"
              >
                {getTitle(data, type)}
              </motion.h1>
              
              <MetaInfo data={data} type={type} />
              
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-gray-300 text-lg leading-relaxed mb-6"
              >
                {data.overview || "줄거리 정보가 없습니다."}
              </motion.p>
              
              <GenreSection data={data} />
              <CreditsSection data={data} type={type} />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 추가 섹션들 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MediaDetailLayout;
