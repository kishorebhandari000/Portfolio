import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";

function Cart() {
  const { cart, addToCart, removeCart } = useContext(ProductContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = () => {
    console.log("Checkout:", cart);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-6xl">🛒</p>
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        <button
          onClick={() => navigate("/Present")}
          className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl"
                />

                {/* Details */}
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>

                  <div className="flex items-center justify-between mt-4">
                    {/* Price */}
                    <p className="text-xl font-bold text-green-600">
                      ${item.price * item.qty}
                      <span className="text-sm text-gray-400 font-normal ml-1">
                        (${item.price} x {item.qty})
                      </span>
                    </p>

                    {/* Quantity Controls + Remove */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                        <button
                          onClick={() => removeCart(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 transition"
                        >
                          -
                        </button>
                        <span className="px-4 font-bold text-gray-800">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Entire Item */}
                      <button
                        onClick={() => {
                          for (let i = 0; i < item.qty; i++) {
                            removeCart(item.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 text-xl transition"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 w-full">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="font-semibold text-gray-800">{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span>Unique Products</span>
                  <span className="font-semibold text-gray-800">{cart.length}</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total Price</span>
                  <span className="text-green-600">${totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Checkout
              </button>

              <button
                onClick={() => navigate("/Present")}
                className="mt-3 w-full border border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;