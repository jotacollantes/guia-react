import { ICartMovie } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | { type: "[Cart] - LoadCart from LocalStorage"; payload: ICartMovie[] }
  | { type: "[Cart] - Add Movie"; payload: ICartMovie[] }
  | { type: "[Cart] - Order Complete" };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from LocalStorage":
      console.log('entro al reducer: [Cart] - LoadCart from cookies',action.payload)
      return {
        ...state,
        //cart: action.payload,
        isLoaded: true,
        cart: [...action.payload],
      };
    //break;
    case "[Cart] - Add Movie":
      //console.log('entro al reducer: [Cart] - Add Movie',action.payload)
      let countItems = 0;
      for (const movie of action.payload) {
        countItems = countItems + movie.quantity;
      }
      return {
        ...state,

        isLoaded: true,
        cart: action.payload,
        numberOfItems: countItems,
      };

    case "[Cart] - Order Complete":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
