import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { RootState } from "../store";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
  const { status } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();


  //! Este useEffect se ejecutara cada vez que se recarga la pagina y va a ejecutar el metodo onAuthStateChanged que verificara si ha cambiado el estado de la autenticacion
  useEffect(() => {
    //!Funcion onAuthStateChanged de Firebase que verifica cuando el estado de la autenticacion cambie.
    onAuthStateChanged(FirebaseAuth, async (user) => {
      //console.log(user)
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        const datosLogin = {
          status: "authenticated",
          displayName,
          email,
          photoURL,
          uid,
          errorMessages: null,
        };
        dispatch(login(datosLogin));
        //! Disparamos el startLoadingNotes que esta en el thunk y que es la funcion que se encargara de traer las notas del usuario
        dispatch(startLoadingNotes(uid))
      } else {
        return dispatch(logout(""));
      }
    });
  }, []);

  return { status };
};
