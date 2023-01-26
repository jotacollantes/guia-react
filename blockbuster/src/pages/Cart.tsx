import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CardList, OrderSumary } from "../components/cart";

// import { OrderSumary } from "../../components/cart";

import { BlockBusterLayout } from "../components/layouts";

export const Cart = () => {
  return (
    <BlockBusterLayout>
      <Typography variant="h1" component={"h1"}>
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* Card List */}
          <CardList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 3 }} />
              {/* Order Sumary */}
              <OrderSumary />
              <Box sx={{ mt: 3 }}>
                <NavLink to="/confirmation">
                  <Button
                    color={"primary"}
                    className="circular-btn"
                    fullWidth
                  >
                    Confirmar Orden
                  </Button>
                </NavLink>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </BlockBusterLayout>
  );
};
