//!no se sabe como viene la respuesta desde un backend
export interface Respuesta {
  [x: string]: any;
}

//!Esta interface tiene la firma del documento Empleado uq e servirar para las actualizaciones
export interface Empleado {
  _id:string
  nombres:string,
  apellidos:string,
  id:string,
  tcontrato:string
};