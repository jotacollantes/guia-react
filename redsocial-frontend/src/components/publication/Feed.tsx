import { DeleteOutline, SettingsOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { FeedList } from "./FeedList";
import { useEffect } from "react";
import { usePublicationFeed } from "../../hooks";

export const Feed = () => {
  const {page,pages,publications, getPublicationFeed,nextPage,dispatch } = usePublicationFeed();

  const fetchPublicationFeed=async(page=1)=>{
    dispatch({type: "PUBLICATION FEED - deletePublication"})
    //console.log('entro al fetch publication feed')
    await getPublicationFeed( page);
  }

  useEffect(() => {
    //getPublication(page);
    fetchPublicationFeed()
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
        }}
        border={0}
      >
        <Grid item xs={12} sx={{ marginLeft: 2 }}>
          {/* <Box border={0} sx={{marginBottom:2}}> */}
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Grid item>
              <Typography variant="h1" component="h1">
                Timeline
              </Typography>
            </Grid>
            <Grid item alignItems={"center"}>
              <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={()=>fetchPublicationFeed()}
              >
                Mostrar Nuevas
              </Button>
            </Grid>
          </Grid>
          {/* </Box> */}
        </Grid>
      </Grid>

      <Divider variant="middle" />

      <FeedList/>
    </>
  );
};