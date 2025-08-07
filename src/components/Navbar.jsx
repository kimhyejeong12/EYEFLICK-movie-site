import { NavLink } from 'react-router-dom';

const navItems = [
  { label: '홈', path: '/' },
  { label: '인기 영화', path: '/movies/popular' },
  { label: '개봉 예정', path: '/movies/upcoming' },
  { label: '평점 높은', path: '/movies/top_rated' },
  { label: '상영 중', path: '/movies/now_playing' }
];

const Navbar = () => {
  return (
    <nav className="flex gap-6 p-4 bg-gray-100 shadow">
      {navItems.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
