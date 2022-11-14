import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { LoginForm } from "../forms/LoginForm";
import { Loading } from "../utils/Loading";

export const Login = () => {
 const {loading}=useContext(UserContext)
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <div className="card">
            <div className="container text-center">
              <i className="fas fa-user fa-5x mt-2"></i>
            </div>
              <div className="card-header text-center mt-3"><h4>Inicio de Sesion de Jefe</h4></div>

            <div className="card-body">

              {
                (!loading)? <LoginForm /> : <Loading/>
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
