import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
  currentValue: number;
  maxValue: number; //Stock
  updatedQuantity: (value: number) => void;
}
export const ItemCounter = ({
  currentValue,
  maxValue = 6,
  updatedQuantity,
}: Props) => {
  //console.log('Item Counter',currentValue,maxValue)
  const seleccionaCantidad = (arg: string) => {
    if (arg === "incrementar") {
      currentValue <= maxValue && updatedQuantity(currentValue + 1);
    } else if (arg === "reducir") {
      currentValue > 1 && updatedQuantity(currentValue - 1);
    }
  };

  return (
    <>
      <Box display={"flex"} alignItems="center">
        {/* Nunca puede ser menor a 1 */}
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Cantidad</Typography>
      </Box>
      <Box display={"flex"} alignItems="center">
        <IconButton onClick={() => seleccionaCantidad("reducir")}>
          <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{ width: 40, textAlign: "center" }}>
          {" "}
          {currentValue}{" "}
        </Typography>
        {/* Nunca puede ser mayor al maximo */}
        <IconButton onClick={() => seleccionaCantidad("incrementar")}>
          <AddCircleOutline />
        </IconButton>
      </Box>
    </>
  );
};
