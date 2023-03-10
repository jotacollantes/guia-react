
import { Card, CardContent, CardMedia, Typography } from "@mui/material";


interface Props{
    image:string,
    name:string
}
export const Character=({ image,name }:Props)=> {
  return (
    <Card>
      <CardMedia
        image={image}
        title="Rick Sanchez"
        sx={{ height: 250, width: 250 }}
      />

      <CardContent>
        <Typography variant="h5">{name}</Typography>
      </CardContent>
    </Card>
  );
}