import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const existingIndex = state.findIndex(
        item => item.id === action.id && item.size === action.size
      );

      if (existingIndex !== -1) {
        const updatedState = [...state];
        updatedState[existingIndex].qty += action.qty;
   
        return updatedState;
      }

      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img
        }
      ];

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    case "DROP":
      return [];
    default:
      console.error("Unknown action type in reducer:", action.type);
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
