import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FechaEntrega, FechaEntrega2 } from "./";

interface Props {
  //!Para Pasar al componente padre <Movie/>
  modalidad: (value: string) => void;
  fechaEntrega: (value: string) => void;
}
export const Modalidad = ({ modalidad, fechaEntrega }: Props) => {
  const [value, setValue] = useState("venta");
  //const [dias, setDias] = useState(1);
  //const plazo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const handleChangeModalidad = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue((event.target as HTMLInputElement).value);
    modalidad((event.target as HTMLInputElement).value);
  };

  // const handleChangeDias = (event: SelectChangeEvent<number>) => {
  //   setDias(event.target.value as number);
  //   console.log(dias);
  // };

  const fecha = (value: string) => {
    fechaEntrega(value);
  };

  let today = new Date();

  useEffect(() => {
    if (value === "alquiler") {
      fechaEntrega(today.toLocaleDateString("en-us"));
    }
  }, [value]);

  return (
    <>
      <Box display={"flex"} alignItems="center">
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Modalidad
        </Typography>
      </Box>
      <Box display={"flex"} alignItems="center">
        <FormControl>
          {/* <FormLabel sx={{fontSize: 20,
          fontWeight: 600}}>Modalidad
          </FormLabel> */}
          <RadioGroup
            row
            aria-labelledby="Modalidad de Servicio"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleChangeModalidad}
          >
            <FormControlLabel value="venta" control={<Radio />} label="venta" />
            <FormControlLabel
              value="alquiler"
              control={<Radio />}
              label="alquiler"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      {value === "venta" ? (
        <></>
      ) : (
        //   <Box sx={{ minWidth: 50 }} display={"flex"} alignItems="center">
        //   <FormControl>
        //     <InputLabel>Dias</InputLabel>
        //     <Select value={dias} label="dias" onChange={handleChangeDias}>
        //       {plazo.map((dia) => {
        //         return (
        //           <MenuItem value={dia} key={dia}>
        //             {dia}
        //           </MenuItem>
        //         );
        //       })}
        //     </Select>
        //   </FormControl>
        // </Box>

        <FechaEntrega2
          fechaEntrega={(value) => {
            return fecha(value);
          }}
        />
      )}
    </>
  );
};
