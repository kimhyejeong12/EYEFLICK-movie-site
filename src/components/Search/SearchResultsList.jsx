import MediaCard from '../common/MediaCard';

function SearchResultsList({ title, items, type }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">{title} ({items.length}개)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <MediaCard key={`${type}-${item.id}`} item={item} type={type} />
        ))}
      </div>
    </div>
  );
}

export default SearchResultsList;

