import { getImageUrl } from "./imageUtils";

const getStatusInfo = (data, type) => {
  if (type === "tv") {
    if (data.status === "Returning Series") return { text: "방영 중", color: "bg-green-600" };
    if (data.status === "Ended") return { text: "종영", color: "bg-red-600" };
    return { text: data.status, color: "bg-gray-600" };
  }
  if (data.status === "Released") return { text: "개봉", color: "bg-green-600" };
  if (data.status === "Post Production") return { text: "후반 작업", color: "bg-yellow-600" };
  return { text: data.status, color: "bg-gray-600" };
};

export const mapMediaData = (data, type = "movie") => {
  const isTv = type === "tv";

  const statusInfo = getStatusInfo(data, type);

  const credits = isTv
    ? (data.created_by || []).map((person) => ({ ...person, job: "Creator" }))
    : (data.credits?.crew || [])
        .filter((crew) => crew.job === "Director" || crew.job === "Producer")
        .slice(0, 5);

  const releaseDateValue = isTv ? data.first_air_date : data.release_date;
  let releaseYear = null;
  if (releaseDateValue) {
    const parsedDate = new Date(releaseDateValue);
    const year = parsedDate.getFullYear();
    releaseYear = Number.isNaN(year) ? null : year;
  }

  const runtimeText = isTv
    ? data.number_of_seasons
      ? `${data.number_of_seasons} 시즌`
      : null
    : data.runtime > 0
    ? `${Math.floor(data.runtime / 60)}시간 ${data.runtime % 60}분`
    : null;

  const voteAverageText = data.vote_average > 0 ? data.vote_average.toFixed(1) : null;

  return {
    id: data.id,
    title: isTv ? data.name : data.title,
    overview: data.overview || "줄거리 정보가 없습니다.",
    posterUrl: getImageUrl(data.poster_path, "w500"),
    backdropUrl: getImageUrl(data.backdrop_path, "original"),
    voteAverage: voteAverageText,
    genres: data.genres || [],
    status: statusInfo.text,
    statusColor: statusInfo.color,
    credits,
    releaseYear,
    runtime: runtimeText,
  };
};

