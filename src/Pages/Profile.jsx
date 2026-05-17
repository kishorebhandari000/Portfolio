import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/Login");
      return;
    }

    getUser();
    getMyProducts();
  }, []);

  const getUser = async () => {
    const response = await fetch("http://localhost:3000/api/auth/getuser", {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    });

    const json = await response.json();
    setUser(json);
  };

  const getMyProducts = async () => {
    const response = await fetch("http://localhost:3000/api/product/getproducts", {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    });

    const json = await response.json();

    if (json.success) {
      setProducts(json.products);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-6 mb-8">
          <HiUserCircle className="text-8xl text-indigo-600" />

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user?.name || "User Profile"}
            </h1>

            <p className="text-gray-500">{user?.email}</p>

            <p className="text-sm text-green-600 mt-2">
              Logged in successfully
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          My Backend Products
        </h2>

        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-gray-500">
            No products added from backend yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm">{product.category}</p>

                <p className="font-semibold text-indigo-600 mt-2">
                  ${product.price}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;