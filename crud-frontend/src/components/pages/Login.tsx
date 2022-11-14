import { useState } from "react";
import { LoginForm } from "../forms/LoginForm";

export const Login = () => {
 
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
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
