import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import avatar from "../../assets/img/user.png";
import { useAuth } from "../../hooks";

export type User = {
  name: string;
  surname: string;
  create_at: string;
  _id: string;
  image: string;
  bio?: string;
};
interface Props {
  user: User;
  //ix: number;
  following: boolean;
}
export const PeopleItem = ({ user, following }: Props) => {
  const { auth,listFollowing, setListFollowing,followUser,unFollowUser } = useAuth();
  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
      }}
      border={0}
      marginBottom={1}
      
      >

      <Grid item xs={3} border={0}>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
          border={0}
        >
          <Grid item>
            <Box
              component="img"
              sx={{ height: 60, border: 0, paddingRight: 2 }}
              alt="Logo"
              src={
                user.image === "default.png"
                  ? avatar
                  : `http://127.0.0.1:3900/api/user/avatar/${user.image}`
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} border={0}>
        {/* <Box> */}
        <Card variant="outlined">
          <CardActions>
            <Typography variant="h6" component="div">
              <Link to={`/social/perfil/${user._id}`}>
              {`${user.name} ${user.surname}`}
              </Link>
              | {`${user.create_at}`}
            </Typography>
          </CardActions>
          <CardContent>
            <Typography variant="h3" component="div">
              {user.bio ? `${user.bio}` : ""}
            </Typography>
          </CardContent>
        </Card>
        {/* </Box> */}
      </Grid>
      <Grid item xs={3} border={0} textAlign={"center"}>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={1}
        >

          
          {
          
          (user._id !== auth.id) && 
          (
            (!following) ? (

            
             
              <Grid item>
                <Button
                variant="contained"
                color="success"
                size="small"
                onClick={()=>followUser(user._id)}
                >
                  Seguir
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button
                variant="contained"
                color="error"
                size="small"
                onClick={()=>unFollowUser(user._id)}
                >
                  Dejar de Seguir
                </Button>
              </Grid>
            
            
            )
          )






          
          
          }
        </Grid>
      </Grid>
    </Grid>
  );
};
