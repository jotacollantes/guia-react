import Swal from "sweetalert2";
import { Respuesta } from "../interfaces/interfaces";
import { Alert } from "./Alert";
import { ApiCall } from "./ApiCall";

export const BorrarEmpleado = async (id: string, token: string) => {
  await Swal.fire({
    title: "¿Esta seguro?",
    text: "Esta accion no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const { data } = await ApiCall(
          `empleado/delete/${id}`,
          "DELETE",
          "",
          token
        );
        //console.log("empleados: ", data.data);
      } catch (error: Respuesta | any) {
        if (!error.response.data.ok) {
          Alert(false, error.response.data.mensaje);
        }
        console.log(`Error en el front end: ${error.response.data.mensaje}`);
      }

      await Swal.fire(
        "Empleado eliminado!",
        "El empleado ha sido eliminado.",
        "success"
      );
    }
  });
};
