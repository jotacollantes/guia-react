import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import { Alert } from "../../helpers/Alert";
import { ApiCall } from "../../helpers/ApiCall";
import { BorrarEmpleado } from "../../helpers/BorrarEmpleado";
import { Empleado, Respuesta } from "../../interfaces/interfaces";
import { ModalActions } from "./ModalActions";

export const Empleados = () => {
  const { user,empleado,setEmpleado } = useContext(UserContext);
  const [empleados, setEmpleados] = useState([]);
  const navegar = useNavigate();

  const getEmpleados = async () => {
    try {
      const { data } = await ApiCall(
        "empleado/listaempleados",
        "GET",
        "",
        user.token
      );
      //console.log("empleados: ", data.data);

      setEmpleados(data.data);
    } catch (error: Respuesta | any) {
      if (!error.response.data.ok) {
        //return Alert(false, error.response.data.mensaje);
      }
      console.log(`Error en el front end: ${error.response.data.mensaje}`);
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const deleteEmpleado = async (id: string, token: string) => {
    await BorrarEmpleado(id, token);
    getEmpleados();
  };


  const buscar=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const valor=e.currentTarget.value
    try {
      if (valor==="") {
        return getEmpleados()
      }
      
      const { data } = await ApiCall(
        `empleado/search/${valor}`,
        "GET",
        "",
        user.token
      );
      //console.log("empleados: ", data.data);

      setEmpleados(data.data);
    } catch (error: Respuesta | any) {
      if (!error.response.data.ok) {
        //return Alert(false, error.response.data.mensaje);
      }
      console.log(`Error en el front end: ${error.response.data.mensaje}`);
    }

  }
  const [open, setOpen] = useState(false);
  const [accion,setAccion]= useState('');

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          <div className="col-md-3">
            <button className="btn btn-primary" onClick={()=>{
              setAccion('new');
              onOpenModal()}}
              >
              <i className="fas fa-plus" />
              Añadir Empleado
            </button>
          </div>
          <div className="col-md-6 ml-auto">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                onChange={(e)=>{
                  buscar(e)
                }}
                required
              />
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Empleados de {user.name}</h4>
                </div>
                {/* aqui poner el spinner */}
                <div className="table-responsive-lg">
                  <table className="table table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Identificacion</th>
                        <th>Tipo de Contrato</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empleados.map((empleado: Empleado, i) => {
                        return (
                          <tr key={empleado._id}>
                            <td>{i + 1}</td>
                            <td>{empleado.nombres}</td>
                            <td>{empleado.apellidos}</td>
                            <td>{empleado.id}</td>
                            <td>{empleado.tcontrato}</td>
                            <td>
                              <button
                                className="btn btn-danger me-2"
                                onClick={() => {
                                  deleteEmpleado(empleado._id, user.token);
                                }}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                              <button className="btn btn-warning"
                              onClick={()=>{
                                setAccion('update');
                                setEmpleado(empleado)
                                onOpenModal()}}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalActions
        open={open}
        onCloseModal={onCloseModal}
        getEmpleados={getEmpleados}
        accion={accion}
      />
    </div>
  );
};
