import React from 'react'
import { usePublication } from '../../hooks/usePublication';
import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import avatar from "../../assets/img/user.png";
import { useAuth } from '../../hooks';
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from 'react-router-dom';

export const PublicationList = () => {
    

    const { auth, getCounters, visitedProfile, setVisitedProfile } = useAuth();
    const {page,pages,total,publicationsByUser, getPublication,deletePublication,nextPage } = usePublication();
    const params = useParams();
    const viewNextPage=()=>{
        nextPage(params.userId!)
      }
  return (
    <>

{
        
        publicationsByUser.length > 0 ? (
          publicationsByUser.map((publicacion: any, ix) => {
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
 
                      { (publicacion.file ) &&
                      <Box
                        component="img"
                        sx={{ height: 60, border: 0, paddingRight: 2}}
                        alt="Logo"
                        src={`http://127.0.0.1:3900/api/publication/media/${publicacion.file}`
                        }
                      />
                      }

                      
                    </CardContent>
                  </Card>
                  {/* </Box> */}
                </Grid>
                {auth.id === publicacion.user._id && (
                  <Grid item xs={3} border={0}>
                    <Box> 
  
                    
  
                  <IconButton onClick={()=>deletePublication(publicacion.user._id,publicacion._id)}>
                    <DeleteIcon color="error" sx={{ fontSize: 40 }} />
                  </IconButton>
  
                    </Box>
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

{
        page < pages && (
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
        )
        }
    </>
  )
}
