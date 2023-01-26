import React, { useEffect, useReducer } from "react";
import { ICartMovie } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  isLoaded:boolean;
  cart: ICartMovie[];
  numberOfItems: number;
  

}

interface Props {
  children: JSX.Element | JSX.Element[];
}

//Inicializamos
const INITIAL_STATE: CartState = {
  isLoaded:false,
  cart: [],
  numberOfItems: 0
};


export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  
 //!Para leer del localStorage y que el carrito sea persistente
useEffect(() => {
  try {
    const localCart=JSON.parse(localStorage.getItem('cart') ||'')
    dispatch({type: "[Cart] - LoadCart from LocalStorage",payload: localCart })
  } catch (error) {
    //console.log(error)
    dispatch({type: "[Cart] - LoadCart from LocalStorage",payload: [] })
  }
}, [])





// //!Para grabar en el  LocalStorage y que el carrito sea persistente
useEffect(() => {
  localStorage.setItem('cart',JSON.stringify(state.cart))
}, [state.cart]);


const addMovieToCart = (movie: ICartMovie) => {


 
    const moviesInCart = state.cart.some(
      (movieItem) =>
        movieItem.title == movie.title
    );
    //console.log(productsInCart)
    if (!moviesInCart) {
      return dispatch({
        type: "[Cart] - Add Movie",
        payload: [...state.cart, movie],
      });
    }



    const updateMoviesInCart = state.cart.map((movieItem) => {
      if (
        movieItem.title === movie.title
      ) {
        movieItem.quantity = movieItem.quantity + movie.quantity;
        return movieItem;
      } else {
        return movieItem;
      }
    });

    dispatch({ type: "[Cart] - Add Movie", payload: updateMoviesInCart });
  };

  const closeOrder = ()=>{
    //localStorage.removeItem("cart");
    localStorage.clear();
    dispatch({ type: "[Cart] - Order Completed"});
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addMovieToCart,
        closeOrder
       
        
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};