import { IMovie } from '../../interfaces';
import { MovieState } from './';

type MovieActionType={
    type: 'MOVIE - SetMovie',
    payload: IMovie
}

//!uiReducer va a regresar un estado con el tipado (firma) :UIState
export const movieReducer=(state:MovieState,action:MovieActionType):MovieState=>{
switch (action.type) {
   case 'MOVIE - SetMovie':
      return {
           ...state,
           movie: action.payload
           

            }
            //break;
       default:
       return state;
}

}