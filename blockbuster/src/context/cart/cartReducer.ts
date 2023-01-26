import { ICartMovie} from "../../interfaces";
import { CartState } from "./";




type CartActionType =
  | { type: "[Cart] - LoadCart from LocalStorage", payload: ICartMovie[] }
  | { type: "[Cart] - Add Movie", payload: ICartMovie[] }
  // | { type: "[Cart] - Update Cart Quantity", payload: ICartMovie }
  |  { type: "[Cart] - Order Complete" }
  ;

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from LocalStorage":
      //console.log('entro al reducer: [Cart] - LoadCart from cookies',action.payload)
      return {
        
        ...state,
        //cart: action.payload,
        isLoaded:true,
        cart: [...action.payload]
      };
    //break;
    case "[Cart] - Add Movie":
      console.log('entro al reducer: [Cart] - Add Movie',action.payload)
      return {
        //!Propago todas las propiedades del estado
        ...state,
        //Sobreescribo la propiedad cart, propago todos los todo que estan dentro del payload.
        //isLoaded:true,
        cart: action.payload,
      };
    // case "[Cart] - Update Cart Quantity":
    //   return {
    //     //!Propago todas las propiedades del estado
    //     ...state,

    //     cart: state.cart.map((movie) => {
    //       //!Para identificar el producto que se va a reemplazar
    //       if (
    //         movie.title === action.payload.title
    //       ) {
    //         return action.payload;
    //       } else {
    //         return movie;
    //       }
    //     }),
    //   };


    //break;

      case "[Cart] - Order Complete":
        return {
          ...state,
          cart:[], 
        
        }

    default:
      return state;
  }
};