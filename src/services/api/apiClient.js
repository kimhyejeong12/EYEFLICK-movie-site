const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

/**
 * TMDB API를 호출하는 중앙 fetcher 함수
 */
export async function fetcher(endpoint, params = {}) {
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: "ko-KR",
    ...params,
  });

  const url = `${BASE_PATH}${endpoint}?${query.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message || "API 요청에 실패했습니다.");
  }

  return response.json();
}

export const API_CONFIG = {
  BASE_PATH,
  DEFAULT_LANGUAGE: "ko-KR",
}; 