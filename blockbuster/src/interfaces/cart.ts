export interface ICartMovie {
  title: string;
  imdbid: string;
  quantity: number;
  image:string,
  modalidad:string ,
  fechaEntrega?:string
}
//export type ITypeModalidad = 'venta'|'alquiler'