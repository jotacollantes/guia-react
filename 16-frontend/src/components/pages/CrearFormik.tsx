import React, { useState } from "react";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup"; //* importo todo dentro de Yup
import { MyTextInput, MyTextArea, MyFileInput } from "../forms";
import { ApiCall } from "../../helpers/ApiCall";

// interface Props {
//   setPeliculas: (args:any)=>void
// }



export const CrearFormik = () => {


  const [isSaving,setIsSaving]=useState("")

  const grabarArticulo = (payload:any) => {
    setIsSaving("Guardando...")

    setTimeout(async() => {
        const respuesta = await ApiCall("crear/", "POST", payload);
        const { data } = respuesta;
        //console.log(data)
        const {_id}=data.articuloGuardado//! Siempre haremos mencion al unico elemento que tiene el array en la respuesta.
        
        if (data.status === "success") {
          //Subir imagen
          const fileInput=document.getElementById('file0') as HTMLInputElement;
          
          //console.log(fileInput)
          //Enviamos el archivo por medio de FormData
          const formData= new FormData() ;
          formData.append('file0',fileInput.files![0])//! con ! afirmamos que siempre vendra un valor y no la posibilidad de que venga un null
          //console.log(fileInput.files![0])

          const uploadFile = await ApiCall(`upload/${_id}`, "POST", formData,true);
          //console.log(uploadFile)
          const { data } = uploadFile;
          if (data.status === "success") {
              setIsSaving("Articulo Guardado.")
          }
          else {
            setIsSaving("Error a subir imagen")
          }
          
          
        } else {
          setIsSaving("Error a grabar datos")
        }
    }, 3000);
  
  };

  return (
    <div className="jumbo">
      <h1>Crear Articulo</h1>
      <p>Formulario para crear articulo</p>
      <strong>{isSaving}</strong>
      <Formik
        initialValues={{
          titulo: "",
          contenido: "",
          file0: "",
        }}
        onSubmit={(values) => {
          const { titulo, contenido, file0 } = values;

          const articulo = {
            titulo: titulo,
            contenido: contenido,
            imagen: file0          };
          //! Guardo en el Backend
          grabarArticulo(articulo);

          

          

          //ACTUALIZO EL ESTADO SAVING
          //setIsSaving(true)

          // Swal.fire({
          //         position: 'top-end',
          //         icon: 'success',
          //         title: 'Your work has been saved',
          //         showConfirmButton: false,
          //         timer: 1500
          // })
        }}
        validationSchema={Yup.object({
          titulo: Yup.string() //*tiene que ser string
            //.min(5,'debe de tener 5 caracteres o mas')
            //.max(100,'debe de tener 15 caracteres o menos')
            .required("Requerido"),

          contenido: Yup.string() //*tiene que ser string
            .required("Requerido"),

          file0: Yup.string() //*tiene que ser string
            .required("Requerido"),
        })}
      >
        {/* CHILDREN de un Higher Order Component como los es el compnent <Formik>*/}
        {
          //* El Componente <Formik/> que es el Higher Order Component expone el objeto formik (que se puede desestructurar {}) que esta como argumento en la funcion children que devuelve un JSX Element

          ({ handleReset }) => (
            <Form className="formulario">
              <div className="form-group">
                <MyTextInput
                  type="text"
                  label="Titulo"
                  name="titulo"
                  placeholder="Titulo"
                />
              </div>
              <div className="form-group">
                <MyTextArea
                  label="Contenido"
                  name="contenido"
                  placeholder="contenido"
                />
              </div>

              <div className="form-group">
                <MyFileInput
                  type="file"
                  label="Imagen"
                  name="file0"
                  id="file0"
                  placeholder="Imagen"
                />
              </div>

              <br />
              {/* <input type="submit" value="Guardar" /> */}
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
            </Form>
          )
        }
      </Formik>
    </div>
  );
};
