import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/Login");
      return;
    }

    getUser();
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

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-6">
          <HiUserCircle className="text-8xl text-indigo-600" />

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user?.name || "User Profile"}
            </h1>

            <p className="text-gray-500">{user?.email}</p>

            <p className="text-sm text-green-600 mt-2">
              Welcome Back!
            </p>

            <button
              onClick={() => navigate("/ManageProducts")}
              className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Manage My Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;