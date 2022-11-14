import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";

import * as Yup from "yup"; //* importo todo dentro de Yup
import { MyTextInput, MyTextArea } from ".";
import { UserContext } from "../../context/UserContext";


// interface Props {
//   setDataUser: (args: any) => void;
// }

//No se necesita props
export const LoginForm = () => {
  //const { setDataUser } = props;
  //!Llamo al contexto UserContext que es el que me va a proveer del state y de los metodos
  const { loginUser } = useContext(UserContext);

  return (
    <Formik
      initialValues={{
        correo: "",
        password: "",
      }}
      onSubmit={async(values) => {
        //console.log(values)

        const { correo, password } = values;

        const credentialsUser = {
          correo,
          password,
        };
        //console.log(credentialsUser);
        await loginUser(credentialsUser);
        //setDataUser(credentialsUser)
      }}
      validationSchema={Yup.object({
        correo: Yup.string() //*tiene que ser string
          //.min(5,'debe de tener 5 caracteres o mas')
          //.max(100,'debe de tener 15 caracteres o menos')
          .required("Requerido"),

        password: Yup.string() //*tiene que ser string
          .required("Requerido"),
      })}
    >
      {/* CHILDREN de un Higher Order Component como los es el compnent <Formik>*/}
      {
        //* El Componente <Formik/> que es el Higher Order Component expone el objeto formik (que se puede desestructurar {}) que esta como argumento en la funcion children que devuelve un JSX Element

        ({ handleReset }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <MyTextInput
                type="email"
                label=""
                name="correo"
                className="form-control"
                placeholder="name@email.com"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <MyTextInput
                type="password"
                label=""
                name="password"
                className="form-control"
                placeholder=""
              />
            </div>

            <br />
            {/* <input type="submit" value="Guardar" /> */}
            <button className="form-control btn btn-primary" type="submit">
              Login
            </button>
          </Form>
        )
      }
    </Formik>
  );
};
