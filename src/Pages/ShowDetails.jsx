import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";

function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProductById, addToCart, removeCart, cart } =
    useContext(ProductContext);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        Product not found
      </div>
    );
  }

  const productId = product._id || product.id;

  const productCount = cart.filter(
    (item) => (item._id || item.id) === productId
  ).length;

  return (
    <div className="relative min-h-screen p-6">
      <button
        className="absolute top-6 left-6 bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
        onClick={() => navigate(-1)}
      >
        ← Go Back
      </button>

      <div className="w-full flex flex-col justify-center items-center gap-4 pt-16">
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md rounded-lg shadow-md mt-4 object-cover"
        />

        <p className="text-2xl font-bold text-indigo-600 mt-2">
          ${product.price}
        </p>

        <p className="text-base text-gray-600 mt-1 text-center max-w-prose">
          {product.description}
        </p>

        <p className="text-sm font-medium text-gray-500">
          In cart:{" "}
          <span className="text-indigo-600 font-bold">{productCount}</span>
        </p>

        <div className="flex gap-3 mt-2">
          <button
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
            onClick={() => addToCart(product)}
          >
            + Add to Cart
          </button>

          <button
            className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => removeCart(productId)}
            disabled={productCount === 0}
          >
            − Remove One
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;