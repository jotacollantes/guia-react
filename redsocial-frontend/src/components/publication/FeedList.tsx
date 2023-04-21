import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import avatar from "../../assets/img/user.png";
import { useAuth, usePublicationFeed } from "../../hooks";

export const FeedList = () => {
  const { auth } = useAuth();
  const { page, pages, publications, nextPage } = usePublicationFeed();

  const viewNextPage = () => {
    nextPage();
  };
  //console.log({ publications });

  return (
    <>
      {publications.length > 0 ? (
        publications.map((publicacion: any, ix) => {
          return (
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 3,
              }}
              border={0}
              key={ix}
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
                        publicacion.user.image === "default.png"
                          ? avatar
                          : `http://127.0.0.1:3900/api/user/avatar/${publicacion.user.image}`
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
                      {`${publicacion.user.name} ${publicacion.user.surname}`}|{" "}
                      {`${publicacion.created_at} `}
                    </Typography>
                  </CardActions>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {publicacion.text}
                    </Typography>

                    {publicacion.file && (
                      <Box
                        component="img"
                        sx={{ height: 60, border: 0, paddingRight: 2 }}
                        alt="Logo"
                        src={`http://127.0.0.1:3900/api/publication/media/${publicacion.file}`}
                      />
                    )}
                  </CardContent>
                </Card>
                {/* </Box> */}
              </Grid>
              {auth.id === publicacion.user._id && (
                <Grid item xs={3} border={0}>
                  <Box></Box>
                </Grid>
              )}
            </Grid>
          );
        })
      ) : (
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 3,
          }}
        >
          <Grid item>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 900 }}>
              No hay publicaciones
            </Typography>
          </Grid>
        </Grid>
      )}

      {page < pages && (
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 3,
          }}
        >
          <Grid item>
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={viewNextPage}
            >
              Ver Mas publicaciones
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};
