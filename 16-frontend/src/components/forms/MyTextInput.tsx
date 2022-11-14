import { ErrorMessage, useField } from 'formik'

interface Props {
    label?: string,
    name: string,
    type ?: 'text'|'email'|'password',
    placeholder?: string,
    // que venga como opcional
    [x: string]: any,
    
}

export const MyTextInput = ({label='',...props}: Props) => {
    const [field,meta]=useField(props)
    //let {value,...rest}=field
     
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
       {/* <input  value={props.valor} {...rest} {...props} /> */}
        {/* se muestra el mensaje de error en un <span></span> */}
        <ErrorMessage name={props.name} component='span'/>
       {
        //*si meta.touched es true (o sea que el usuario intento hacer algo) y si hay mensaje de error se muestra el mensaje de error con meta.error dentro de un <span <span></span>
       
        //meta.touched && meta.error && (<span className="error">{meta.error}</span>)  
       }
</>
   )
}
