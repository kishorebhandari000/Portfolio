import { Link, useNavigate } from "react-router-dom";
import logok from "../assets/logok.png";
import {
  HiHome,
  HiUser,
  HiLightBulb,
  HiHeart,
  HiShoppingCart,
} from "react-icons/hi";
import ProductContext from "../context/ProductContext";
import { useContext } from "react";

function Navbar() {
  const navigate = useNavigate();

  const { cart } = useContext(ProductContext);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white top-0 sticky z-50 px-6 py-5">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={logok}
            alt="logo"
            className="w-12 h-12 object-contain rounded-full border-2 border-white"
          />
          <h1 className="text-2xl !text-white">KB</h1>
        </div>

        <div className="flex gap-6">
          <Link to="/" className="flex items-center gap-1 hover:text-gray-300">
            <HiHome /> Home
          </Link>

          <Link
            to="/Hobbies"
            className="flex items-center gap-1 hover:text-gray-300"
          >
            <HiHeart /> Hobbies
          </Link>

          <Link
            to="/Present"
            className="flex items-center gap-1 hover:text-gray-300"
          >
            <HiUser /> Present
          </Link>

          <Link
            to="/Goals"
            className="flex items-center gap-1 hover:text-gray-300"
          >
            <HiLightBulb /> Goals
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/Cart")}
          >
            <HiShoppingCart className="text-3xl" />

            <span className="absolute bg-red-500 -top-2 -right-2 w-5 h-5 text-white text-xs flex justify-center items-center rounded-full">
              {cart.reduce((total, item) => total + item.qty, 0)}
            </span>
          </div>

          {token ? (
            <>
              <button
                onClick={() => navigate("/Profile")}
                className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/Login")}
              className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;