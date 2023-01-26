import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
    
    fechaEntrega: (value: string) => void;
  }

export const FechaEntrega2=({fechaEntrega}:Props)=> {
    let today = new Date()
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(today));


const handlerDate=(newValue: dayjs.Dayjs | null)=>{
   
  setValue(newValue);
  //!Siempre se devolvera una fecha
  fechaEntrega(newValue?.toDate().toLocaleDateString('en-us')||today.toLocaleDateString('en-us'))
}

  
  //console.log(value?.toDate().toLocaleDateString('en-us'))

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Fecha de Entrega"
        value={value}
        onChange={(newValue) => {
            handlerDate(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}