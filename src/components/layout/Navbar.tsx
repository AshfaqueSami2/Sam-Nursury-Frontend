// Navbar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import cartIcon from "../../assets/img/icon/shopping-cart.svg";
import logo from "../../assets/img/image/Gemini_Generated_Image_cudhf1cudhf1cudh.jpeg";
import { RootState } from "../../redux/store";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useSelector((state:RootState) => state.cart.items.length); // Access cart count from state
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getLinkClass = (path:any) =>
    location.pathname === path
      ? "text-[#87bdd8] dark:text-[#8D94BA]" // Active link class
      : "text-[#629CA4] dark:text-white hover:text-[#3d7c8b] dark:hover:text-[#3d7c8b]";

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            <img
              style={{ height: "60px", borderRadius: "50px" }}
              src={logo}
              alt=""
            />
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link to="/tree" className={getLinkClass("/tree")}>
              Tree
            </Link>
            <Link to="/about-us" className={getLinkClass("/about-us")}>
              About Us
            </Link>
            <Link to="/dashboard" className={getLinkClass("/dashboard")}>
              Dashboard
            </Link>
          </div>
          <div className="flex items-center">
            <div>
              <Link to="/cart" className="relative">
                {cartCount > 0 && <p>{cartCount}</p>}
                <img style={{ height: "20px" }} src={cartIcon} alt="" />
              </Link>
            </div>
            <button
              type="button"
              className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <ul className="space-y-1 p-4">
            <li>
              <Link to="/" className={getLinkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/tree" className={getLinkClass("/tree")}>
                Tree
              </Link>
            </li>
            <li>
              <Link to="/about-us" className={getLinkClass("/about-us")}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
