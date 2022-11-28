export const fileUpload=async(file:Blob)=>{
     
    if (!file) throw new Error('No tenemos ningun archivo a subir')
    const cloudUrl='https://api.cloudinary.com/v1_1/j2systems/upload'

    //Construimos el formdata creando una instancia del objeto FormData de JS
    const formData = new FormData
    formData.append('upload_preset','react-journal')
    formData.append('file',file)

    try {

        const resp= await fetch (cloudUrl,{method:'POST',body: formData})
        //console.log(resp)

        //!resp.ok y resp.json() son propiedades y metodos de Fetch asignadas o instanciadas en la variable resp.
        if (!resp.ok) throw new Error('No se pudo subir imagen')
        const cloudResp=await resp.json()
        return cloudResp.secure_url
        
    } catch (error:any) {
        console.log(error)
        throw new Error(error.message)
    }



}