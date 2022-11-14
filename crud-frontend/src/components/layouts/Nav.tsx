import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export const Nav = () => {

    const {user,logout}=useContext(UserContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Inicio
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-controls="navbarNav"
          data-target="#navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-na ms-auto">
            {user.login ?
            <>
            <li className="nav-item">
            
              <NavLink className="nav-link" to="/empleados">
              <i className="fas fa-user" />Bienvenido {user.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={()=>{logout()}}>
                <i className="fas fa-user-times"/>Salir
              </NavLink>
            </li>
            </>:

            <li className="nav-item">
            <NavLink className="nav-link" to="/registro">
              <i className="fas fa-user-plus" />Registrarme
            </NavLink>
          </li>
            }
            
            
            
            



            



          </ul>
        </div>
      </div>
    </nav>
  );
};
