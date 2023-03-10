import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export const CardMui = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Card
      sx={{
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      >
        <CardActionArea>
          <CardMedia
            component={"img"}
            image="https://via.placeholder.com/200"
            height={200}
            alt="esta es una descripcion"
          />

          <CardContent>
            <Typography variant="h5" component={"h1"}>
              Card Title
            </Typography>
            <Typography variant="body1" component="p">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              beatae, reprehenderit asperiores nam et officiis, incidunt debitis
              doloremque cum quisquam ullam veniam pariatur natus! Aliquam
              dignissimos quisquam odio distinctio culpa!
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button variant="contained">Add</Button>
          <Button variant="contained" color="error">
            Remove
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};
