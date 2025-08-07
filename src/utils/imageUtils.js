export function getImageUrl(path, size = 'w500') {
  if (!path) return 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
