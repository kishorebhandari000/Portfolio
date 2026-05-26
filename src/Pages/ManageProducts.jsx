import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";

function ManageProducts() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    products,
    getMyProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useContext(ProductContext);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
      return;
    }

    getMyProducts();

    if (location.state?.product) {
      startEdit(location.state.product);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({
        ...form,
        image: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const clearForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      image: null,
      category: "",
    });

    setEditId(null);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const json = await addProduct(form);

    if (json.success) {
      clearForm();
    }
  };

  const startEdit = (product) => {
    setEditId(product._id);

    setForm({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      image: null,
      category: product.category || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const json = await updateProduct(editId, form);

    if (json.success) {
      clearForm();
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    await deleteProduct(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Manage Products
          </h1>

          <h2 className="text-xl font-bold text-gray-700 mb-4">
            {editId ? "Edit Product" : "Add New Product"}
          </h2>

          <form
            onSubmit={editId ? handleUpdateProduct : handleAddProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 md:col-span-2"
              rows="4"
            ></textarea>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                {editId ? "Update Product" : "Add Product"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          My Products
        </h2>

        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-gray-500">
            No products added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow p-4">
                <img
                  src={
                    product.image
                      ? `http://localhost:3000${product.image}`
                      : "https://via.placeholder.com/300"
                  }
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

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => startEdit(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;