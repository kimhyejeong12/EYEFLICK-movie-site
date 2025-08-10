import { getImageUrl } from "./imageUtils";

const STATUS_MAP = {
  "Returning Series": { text: "방영 중", color: "bg-green-600" },
  Ended: { text: "종영", color: "bg-red-600" },
  Released: { text: "개봉", color: "bg-green-600" },
  "Post Production": { text: "후반 작업", color: "bg-yellow-600" },
};

const formatRuntime = (minutes) => {
  if (!minutes || minutes <= 0) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}시간 ${mins}분`;
};

const getReleaseYear = (dateString) => {
  if (!dateString) return null;
  const year = new Date(dateString).getFullYear();
  return Number.isNaN(year) ? null : year;
};

const getCredits = (data, isTv) => {
  if (isTv) {
    return (data.created_by || []).map((person) => ({ ...person, job: "Creator" }));
  }
  return (data.credits?.crew || [])
    .filter((crew) => ["Director", "Producer"].includes(crew.job))
    .slice(0, 5);
};

const formatTvSeasons = (seasons) => {
  return seasons ? `${seasons} 시즌` : null;
};

export const mapMediaData = (data, type = "movie") => {
  const isTv = type === "tv";
  const statusInfo = STATUS_MAP[data.status] || { text: data.status, color: "bg-gray-600" };
  
  return {
    id: data.id,
    title: isTv ? data.name : data.title,
    overview: data.overview || "줄거리 정보가 없습니다.",
    posterUrl: getImageUrl(data.poster_path, "w500"),
    backdropUrl: getImageUrl(data.backdrop_path, "original"),
    genres: data.genres || [],
    voteAverage: data.vote_average > 0 ? data.vote_average.toFixed(1) : null,
    status: statusInfo.text,
    statusColor: statusInfo.color,
    credits: getCredits(data, isTv),
    releaseYear: getReleaseYear(isTv ? data.first_air_date : data.release_date),
    runtime: isTv 
      ? formatTvSeasons(data.number_of_seasons)
      : formatRuntime(data.runtime),
  };
};

