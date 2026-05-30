import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import bg from "../assets/image11.jpeg";
import {toast} from "react-toastify";

function Present() {
  const navigate = useNavigate();

  const { products, cart, addToCart, removeCart } =
    useContext(ProductContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getQuantity = (product) => {
    const productId = product._id || product.id;

    const item = cart.find((i) => (i._id || i.id) === productId);

    return item ? item.qty : 0;
  };

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (product) => {
    if (!product._id) {
      alert("Local products cannot be edited. Only backend products can be edited.");
      setOpenMenuId(null);
      return;
    }

    navigate("/ManageProducts", {
      state: {
        product,
        mode: "edit",
      },
    });

    setOpenMenuId(null);
  };

  const handleDelete = (product) => {
    if (!product._id) {
      alert("Local products cannot be deleted. Only backend products can be deleted.");
      setOpenMenuId(null);
      return;
    }

    navigate("/ManageProducts", {
      state: {
        product,
        mode: "delete",
      },
    });

    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="mb-10 text-center py-20 rounded-2xl bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Our Products
            </h1>

            <p className="text-gray-200 mt-3">
              Shop by category and find your favorite items
            </p>

            <button
              onClick={() => navigate("/ManageProducts")}
              className="mt-5 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="md:w-64 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category || "Uncategorized"}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const productId = product._id || product.id;

              return (
                <div
                  key={productId}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div className="relative bg-gray-100">
                   <img
                         src={
                               product.image
                               ? `http://localhost:3000${product.image}`
                               : "https://via.placeholder.com/300" }
                               alt={product.name}
                               className="w-full h-56 object-cover"
                   />

                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                      {product.category || "Category"}
                    </span>

                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => toggleMenu(productId)}
                        className="bg-white/80 hover:bg-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow text-xl font-bold"
                      >
                        ⋮
                      </button>

                      {openMenuId === productId && (
                        <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg z-10 overflow-hidden">
                          <button
                            onClick={() => handleEdit(product)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(product)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>

                    <p className="text-2xl font-bold text-green-600 mt-2">
                      ${product.price}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      {product.description}
                    </p>

                    <div className="flex gap-3 mt-5">
                      {getQuantity(product) === 0 ? (
                        <button
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex flex-1 items-center justify-between bg-gray-100 rounded-lg px-2">
                          <button
                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                            onClick={() => removeCart(productId)}
                          >
                            -
                          </button>

                          <span className="text-lg font-bold">
                            {getQuantity(product)}
                          </span>

                          <button
                            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                            onClick={() => addToCart(product)}
                          >
                            +
                          </button>
                        </div>
                      )}

                      <button
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                        onClick={() => navigate(`/product/${productId}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Present;