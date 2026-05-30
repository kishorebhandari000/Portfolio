import { useEffect, useReducer } from "react";
import ProductContext from "./ProductContext";
import Reduce from "./Reduce";
import { toast } from "react-toastify";
function ProductState(props) {
  const initialState = {
    products: [],
    cart: [],
  };

  const [state, dispatch] = useReducer(Reduce, initialState);

  // Get all products from backend
  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/product/getproducts");

      const json = await response.json();

      if (json.success) {
        dispatch({
          type: "SET_PRODUCTS",
          payload: json.products,
        });
      }
    } catch (error) {
      console.log("Product fetch error:", error);
    }
  };

  // Get only logged-in user's products
  const getMyProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/product/myproducts", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();

      if (json.success) {
        dispatch({
          type: "SET_PRODUCTS",
          payload: json.products,
        });
      }

      return json;
    } catch (error) {
      console.log("My products fetch error:", error);
    }
  };

  // Add product with image upload
  const addProduct = async (form) => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);

    if (form.image) {
      formData.append("image", form.image);
    }

    const response = await fetch("http://localhost:3000/api/product/createproduct", {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });

    const json = await response.json();
  console.log("Added Product Response:", json);
    if (json.success) {
      dispatch({
        type: "ADD_PRODUCT",
        payload: json.product,
      });
    }
    toast.success("Product Added Successfully");
    return json;
  };

  // Update product with optional new image
  const updateProduct = async (id, form) => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);

    if (form.image) {
      formData.append("image", form.image);
    }

    const response = await fetch(
      `http://localhost:3000/api/product/editmyproduct/${id}`,
      {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      }
    );

    const json = await response.json();
    console.log("Updated Product Response:", json);

    if (json.success) {
      dispatch({
        type: "UPDATE_PRODUCT",
        payload: json.product,
      });
    }
    toast.success("Product Updated Successfully");
    return json;
  };

  // Delete product
  const deleteProduct = async (id) => {
    const response = await fetch(
      `http://localhost:3000/api/product/deletemyproduct/${id}`,
      {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const json = await response.json();
console.log("Delete Product Response:", json);
    if (json.success) {
      dispatch({
        type: "DELETE_PRODUCT",
        payload: id,
      });
    }
    toast.error("Product Deleted");
    return json;
  };

  // Find product by id
  const getProductById = (id) => {
    return state.products.find(
      (product) => product._id === id || product.id === Number(id)
    );
  };

  // Add item to cart
  const addToCart = (product) => {
    dispatch({
      type: "ADD_CART",
      payload: product,
    });
    toast.success("Added To Cart");
  };

  // Remove item from cart
  const removeCart = (id) => {
    dispatch({
      type: "REMOVE_CART",
      payload: id,
    });
    toast.info("Removed From Cart");
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        getProducts,
        getMyProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        addToCart,
        removeCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState;