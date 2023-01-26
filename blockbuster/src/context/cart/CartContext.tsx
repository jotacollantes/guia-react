
import { createContext } from "react";
import { ICartMovie, } from "../../interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartMovie[]; // Sera un Array de ICartProduct


  
  //!Methods
  addMovieToCart: (movie: ICartMovie) => void
  //updateCartQuantity: (product: ICartMovie) => void;
  //createOrder: () => Promise<{hasError:boolean;message:string;}>
}

export const CartContext = createContext({} as ContextProps);