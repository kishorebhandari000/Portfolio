const Reduce = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case "ADD_CART": {
      const productId = action.payload._id || action.payload.id;

      const exist = state.cart.find(
        (item) => (item._id || item.id) === productId
      );

      if (exist) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            (item._id || item.id) === productId
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    }

    case "REMOVE_CART": {
      const exist = state.cart.find(
        (item) => (item._id || item.id) === action.payload
      );

      if (!exist) return state;

      if (exist.qty === 1) {
        return {
          ...state,
          cart: state.cart.filter(
            (item) => (item._id || item.id) !== action.payload
          ),
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          (item._id || item.id) === action.payload
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };
    }

    default:
      return state;
  }
};

export default Reduce;