import React, { useState } from 'react'
import Modal from "react-responsive-modal";

import { RegistroEmpleadoForm } from '../forms/RegistroEmpleadoForm';
import { UpdateEmpleadoForm } from '../forms/UpdateEmpleadoForm';

interface Props {
  open:boolean;
  onCloseModal:() => void,
  getEmpleados: () => Promise<void>,
  accion:string,

}

export const ModalActions = (props:Props) => {
  const {open,onCloseModal,getEmpleados,accion}=props


  
  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className='card'>
        <div className='card-header'>
          <h4>
            {
              (accion==="new") ? "Añadir Empleado" : "Actualizar Datos"
            }
          </h4>
          <div className='card-body'>
            {
            (accion==="new")
            ?<RegistroEmpleadoForm getEmpleados={getEmpleados} onCloseModal={onCloseModal}/>
            :<UpdateEmpleadoForm getEmpleados={getEmpleados} onCloseModal={onCloseModal}/>
            }
          
          </div>
        </div>
      </div>
    
  </Modal>
  )
}
