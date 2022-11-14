import Swal from "sweetalert2";
export const Alert =(icon:boolean,title:string,)=>{

    Swal.fire({
        //position: 'top-end', //!Por defecto se muestra centrado
        icon: icon ? 'success' : 'error' ,
        title: title,
        showConfirmButton: false,
        timer: 1500
      })
}