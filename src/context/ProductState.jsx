import { useReducer, useState, useEffect } from "react";
import ProductContext from "./ProductContext";
import Reduce from "./Reduce";

import apple from "../assets/apple.jpg";
import banana from "../assets/banana.jpg";
import grapes from "../assets/grapes.jpg";
import milk from "../assets/milk.jpg";
import bread from "../assets/bread.jpg";
import cheese from "../assets/cheese.jpg";

function ProductState(props) {
  const localProducts = [
    {
      id: 1,
      name: "Apple",
      image: apple,
      price: 30,
      category: "Fruits",
      description: "Fresh and juicy apple",
    },
    {
      id: 2,
      name: "Banana",
      image: banana,
      price: 20,
      category: "Fruits",
      description: "Sweet ripe banana",
    },
    {
      id: 3,
      name: "Grapes",
      image: grapes,
      price: 50,
      category: "Fruits",
      description: "Juicy seedless grapes",
    },
    {
      id: 4,
      name: "Milk 4-pack 2Ltrs each",
      image: milk,
      price: 15,
      category: "Dairy",
      description:
        "Fresh full cream milk available at your place. This is fresh made from our farm. This milk is not dairy free.",
    },
    {
      id: 5,
      name: "Bread",
      image: bread,
      price: 10,
      category: "Bakery",
      description: "Soft and tasty bread",
    },
    {
      id: 6,
      name: "Cheese",
      image: cheese,
      price: 25,
      category: "Dairy",
      description: "Creamy delicious cheese",
    },
  ];

  const [backendProducts, setBackendProducts] = useState([]);

  const [cart, dispatch] = useReducer(Reduce, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/product/getproducts");

      const json = await response.json();

      if (json.success) {
        setBackendProducts(json.products);
      }
    } catch (error) {
      console.log("Product fetch error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const products = [...localProducts, ...backendProducts];

  const getProductById = (id) => {
    return products.find(
      (p) => p.id === parseInt(id) || p._id === id
    );
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_CART", payload: product });
  };

  const removeCart = (id) => {
    dispatch({ type: "REMOVE_CART", payload: id });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        getProductById,
        cart,
        addToCart,
        removeCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState;