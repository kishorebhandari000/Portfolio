const Reduce = (cart, action) => {
  switch (action.type) {
    case "ADD_CART": {
      const exist = cart.find((item) => item.id === action.payload.id);

      if (exist) {
        return cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...cart, { ...action.payload, qty: 1 }];
    }

    case "REMOVE_CART": {
      const exist = cart.find((item) => item.id === action.payload);

      if (!exist) {
        return cart;
      }

      if (exist.qty === 1) {
        return cart.filter((item) => item.id !== action.payload);
      }

      return cart.map((item) =>
        item.id === action.payload
          ? { ...item, qty: item.qty - 1 }
          : item
      );
    }

    default:
      return cart;
  }
};

export default Reduce;