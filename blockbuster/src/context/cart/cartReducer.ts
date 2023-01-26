import { ICartMovie } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | { type: "[Cart] - LoadCart from LocalStorage"; payload: ICartMovie[] }
  | { type: "[Cart] - Add Movie"; payload: ICartMovie[] }
  | { type: "[Cart] - Order Completed" };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  let countItems;
  switch (action.type) {
    case "[Cart] - LoadCart from LocalStorage":
  
      countItems = 0;
      for (const movie of action.payload) {
        countItems = countItems + movie.quantity;
      }
      return {
        ...state,
        //cart: action.payload,
        isLoaded: true,
        cart: [...action.payload],
        numberOfItems: countItems,
      };
    //break;
    case "[Cart] - Add Movie":
     
      countItems = 0;
      for (const movie of action.payload) {
        countItems = countItems + movie.quantity;
      }
      return {
        ...state,

        isLoaded: true,
        cart: action.payload,
        numberOfItems: countItems,
      };

    case "[Cart] - Order Completed":
      return {
        ...state,
        isLoaded: false,
        cart: [],
        numberOfItems: 0,
      };

    default:
      return state;
  }
};
