import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NavButton = ({ label, path }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <li className="relative flex justify-center flex-col">
      <Link 
        to={path}
        className="text-gray-300 hover:text-white transition-colors duration-300"
      >
        {label} 
        {isActive && (
          <motion.span
            layoutId="circle"
            className="absolute w-1 h-1 bg-purple-400 rounded-full bottom-0 left-0 right-0 mx-auto"
            style={{ bottom: '-5px' }}
          />
        )}
      </Link>
    </li>
  );
};

export default NavButton;
