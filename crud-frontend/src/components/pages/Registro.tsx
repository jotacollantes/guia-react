import { RegistroForm } from "../forms/RegistroForm";

export const Registro = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <div className="card">
            <div className="container text-center">
              <i className="fas fa-user-plus fa-5x mt-2"></i>
            </div>
              <div className="card-header text-center mt-3"><h4>Registro de Jefe</h4></div>

            <div className="card-body">
              <RegistroForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};