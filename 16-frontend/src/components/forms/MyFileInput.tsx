import { ErrorMessage, useField } from 'formik'

interface Props {
    label?: string,
    name: string,
    type ?: 'file',
    placeholder?: string,
    //* Cualquier propiedad que venga como opcional
    [x: string]: any
}

export const MyFileInput = ({label='',...props}: Props) => {
    const [field,meta]=useField(props)
    //console.log({label,props,field,meta});
  return (
<>
{(label!=='') && <label htmlFor={props.id||props.name}>{label}</label>}
        {/* con ...field propago:
        name: "firstName"
        onBlur: ƒ ()
        onChange: ƒ ()
        value: "" */}

        {/* con ...props propago:
        name: "firstName"
        placeholder: "First Name" */}
        <input  {...field} {...props} />
        {/* se muestra el mensaje de error en un <span></span> */}
        <ErrorMessage name={props.name} component='span'/>
       {
        //*si meta.touched es true (o sea que el usuario intento hacer algo) y si hay mensaje de error se muestra el mensaje de error con meta.error dentro de un <span <span></span>
       
        //meta.touched && meta.error && (<span className="error">{meta.error}</span>)  
       }
</>
   )
}
