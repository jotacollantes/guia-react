import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup"; //* importo todo dentro de Yup
import { MySelect, MyTextInput } from ".";
import { UserContext } from "../../context/UserContext";

// interface Props {
//   setDataUser: (args: any) => void;
// }

interface Props {
  
  getEmpleados: () => Promise<void>;
  onCloseModal: () => void
}
export const UpdateEmpleadoForm = (props:Props) => {
  
  const {getEmpleados,onCloseModal}=props
  //!Llamo al contexto UserContext que es el que me va a proveer del state del empleado a modificar y los metodos
  const {empleado,updateEmpleado } = useContext(UserContext);
  const tcontrato = ["Fijo", "Temporal", "Practicante"];
 
  return (
    <Formik
      initialValues={{
        //nombres: "",
        nombres:empleado.nombres,
        apellidos: "",
        id: "",
        tcontrato: "Fijo",
      }}
      onSubmit={async(values) => {
        //console.log(values)

        const { nombres, apellidos, id, tcontrato } = values;

        const dataEmpleado = {
          _id:empleado._id,//!Obtenido del contexto
          nombres,
          apellidos,
          id,
          tcontrato,
        };
        
        await updateEmpleado(dataEmpleado);
        onCloseModal()
        await getEmpleados()
      }}
      validationSchema={Yup.object({
        nombres: Yup.string() //*tiene que ser string
          //.min(5,'debe de tener 5 caracteres o mas')
          //.max(100,'debe de tener 15 caracteres o menos')
          .required("Requerido"),

        apellidos: Yup.string() //*tiene que ser string
          .required("Requerido"),

        id: Yup.string() //*tiene que ser string
          .required("Requerido"),
      })}
    >
      {/* CHILDREN de un Higher Order Component como los es el compnent <Formik>*/}
      {
        //* El Componente <Formik/> que es el Higher Order Component expone el objeto formik (que se puede desestructurar {}) que esta como argumento en la funcion children que devuelve un JSX Element

        ({ handleReset }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Nombres</label>
              <MyTextInput
                type="text"
                label=""
                name="nombres"
                className="form-control"
                placeholder=""
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <MyTextInput
                type="text"
                label=""
                name="apellidos"
                className="form-control"
                placeholder=""
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Identificacion</label>
              <MyTextInput
                type="text"
                label=""
                name="id"
                className="form-control"
                placeholder=""
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo de Contrato</label>
              <MySelect label="" name="tcontrato" className="form-select">
                {tcontrato.map((contrato, index) => {
                  return <option value={contrato} key={index}>
                    {contrato}
                  </option>;
                })}
              </MySelect>
            </div>

            <br />
            {/* <input type="submit" value="Guardar" /> */}
            <button className="form-control btn btn-primary" type="submit">
              Grabar
            </button>
          </Form>
        )
      }
    </Formik>
  );
};
