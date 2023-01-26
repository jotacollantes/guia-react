import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/cart";

export const OrderSumary = () => {
  const { numberOfItems } = useContext(CartContext);

  return (
    <Grid container>
      <Grid item xs={6} sx={{ border: 0 }}>
        <Typography>No. Items: </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        display="flex"
        justifyContent={"end"}
        sx={{ border: 0 }}
      >
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? "Items" : "Item"}
        </Typography>
      </Grid>
    </Grid>
  );
};
