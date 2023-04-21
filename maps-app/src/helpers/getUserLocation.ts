//:Promise<[number,number]>
export const getUserLocation=async():Promise<[number,number]> =>
{

    return new Promise ((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(
            ({coords})=>{
                //Devuelvo un array con las coordenadas
                resolve([coords.longitude,coords.latitude])
            },
            (err)=>{
                alert('No se pudo obtener geolocalizacion')
                console.log(err)
                reject()
            })
    })

    
       
    


}