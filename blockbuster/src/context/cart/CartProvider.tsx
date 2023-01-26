import React, { useEffect, useReducer } from "react";
import { ICartMovie, IMovie } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  isLoaded:boolean;
  cart: ICartMovie[];
  

}

interface Props {
  children: JSX.Element | JSX.Element[];
}

//Inicializamos
const INITIAL_STATE: CartState = {
  isLoaded:false,
  cart: []
};


export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  
 //!Para leer las cookies y que el carrito sea persistente
//   useEffect(() => {
                        
//     try {
//       const cookieCart= Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!):[]
//        //const cookieCart=  JSON.parse(Cookie.get('cart')!)
//        dispatch({type: "[Cart] - LoadCart from cookies",payload: cookieCart })
      
//        //console.log('leyo la cookie primero',cookieCart)
//     } catch (error) {
//       //console.log(error)
//       dispatch({type: "[Cart] - LoadCart from cookies",payload: [] })
//       //console.log('No se leyo la cookie',error)
//     }
   
//  }, []);




// //!Para grabar las cookies y que el carrito sea persistente
// useEffect(() => {
//   //console.log('entro por aqui',state.cart)
//    //console.log('grabando cookies', state.cart)
//    //console.log('state: ',state.cart)
//  Cookie.set('cart', JSON.stringify(state.cart));
 
// }, [state.cart]);





  
//Todo addMovieToCart

const addMovieToCart = (movie: ICartMovie) => {
    //todo dispatch
    //console.log(state.cart)

    //! Si no hay productos con el mismo id y misma size se ejecuta el dispatch [...state.cart,product]
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

    //! Si se llega en este punto es porque si hay productos con el mismo id y con la misma talla. Aqui se muta el estado en un nuevo arreglo con la cantidad de items actualizado

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

  return (
    <CartContext.Provider
      value={{
        ...state,
        addMovieToCart
       
        
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};