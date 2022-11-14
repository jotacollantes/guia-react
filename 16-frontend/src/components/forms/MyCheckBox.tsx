import { ErrorMessage, useField } from 'formik'

interface Props {
    label: string,
    name: string,
    //* Cualquier propiedad que venga como opcional
    [x: string]: any
}

export const MyCheckBox = ({label,...props}: Props) => {
    const [field,meta]=useField({...props,type: 'checkbox'})
    //console.log({label,props,field,meta});
  return (
<>
<label>


      {/* con ...field propago:
        name: "firstName"
        onBlur: ƒ ()
        onChange: ƒ ()
        value: "" */}

        {/* con ...props propago:
        name: "firstName"
        placeholder: "First Name" */}
  <input type='checkbox' {...field} {...props} />
    {label}
    
       {
        //*si meta.touched es true (o sea que el usuario intento hacer algo) y si hay mensaje de error se muestra el mensaje de error con meta.error dentro de un < >
       
       // meta.touched && meta.error && (<span className="error">{meta.error}</span>)  
       }
</label>
<ErrorMessage name={props.name} component='span'/>
       
</>
   )
}
