import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'



export const EjemploComponente = () => {
  const [mostrar, setMostrar] = useState(false)
  const caja=useRef<HTMLDivElement>(null)
  const boton=useRef<HTMLButtonElement>(null)


  // useLayoutEffect
  // Por otro lado, useLayoutEffect se ejecuta de manera síncrona después de que se tenga el render del componente, pero ANTES de ser pintado en pantalla.
  // Todo lo que hagas con este hook hará que el paint del componente tarde más de lo esperado, lo cual puede afectar el performance.

  // Ahora verás que pasa con tu componente:

  // El estado del componente cambia
  // El componente se vuelve a renderizar
  // useLayoutEffect se ejecuta y React espera a que termine
  // El componente es mostrado en pantalla

  useLayoutEffect(() => {
    console.log('useLayoutEffect: Componente cargado!!!')
  }, [])



// useEffect
// Este hook se ejecuta de manera asíncrona después de ser renderizado y mostrado el componente en pantalla.

// Este es el paso a paso que sucede con tu componente cuando estás usando este hook:

// El estado del componente cambia
// El componente se vuelve a renderizar
// El componente es mostrado en pantalla
  useEffect(() => {
    console.log('useEffect: Componente cargado!!!')
    

    if(!caja.current) return ;
    //!Cordenada del boton
    const {bottom}:any=boton.current?.getBoundingClientRect() 
    //console.log(bottom)

    setTimeout(() => {
      if (caja.current) caja.current.style.top=`${bottom +45}px`
      if (caja.current) caja.current.style.left=`${bottom +45}px`
    }, 1000);
    

  }, [mostrar])
  
  return (
    <div>
        <h1>Ejemplo usesEffect y useLayouEffect</h1>
        <button ref={boton} onClick={()=>setMostrar((prev)=>!prev)}>Mostrar Mensaje</button>
        {
          mostrar && <div id="caja" ref={caja} >Hola, soy un mensaje</div>
        }
        </div>
        
  )
}
