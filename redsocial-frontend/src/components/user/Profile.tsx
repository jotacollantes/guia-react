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
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, redirect } from "react-router-dom";
import { redSocialApi } from "../../api";
import avatar from "../../assets/img/user.png";
import { useAuth } from "../../hooks";
import { useGetProfileUser } from "../../hooks";
import { useGetCountersUser } from "../../hooks/useGetCountersUser";
import { usePublication } from "../../hooks/usePublication";
import { PublicationContext } from "../../context/publication";
import { PublicationList } from "../publication";

export const Profile = () => {
  const { auth, getCounters, visitedProfile, setVisitedProfile } = useAuth();
  const {page,pages,total,publicationsByUser, getPublication,deletePublication,nextPage,dispatch } = usePublication();
  const params = useParams();
  const { data, isFollowed, isLoading, hasError } = useGetProfileUser(
    params.userId!,
    auth.token
  );

  const { data: dataStats } = useGetCountersUser(params.userId!, auth.token);


  const followUser = async (userId: string) => {
    //Peticion al backend para seguir
    //console.log('Provider follower: ',userId)
    try {
      const { data } = await redSocialApi.post(
        `follow/save`,
        JSON.stringify({ followed: userId }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      );
      //console.log(data)
      await getCounters(auth.id, auth.token);
      setVisitedProfile(true);
      //setUserStats({...userStats,following:userStats.following+1})
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowUser = async (userId: string) => {
    //Peticion al backend para seguir
    //console.log('Provider unFollower: ',userId)
    try {
      const { data } = await redSocialApi.delete(`follow/unfollow/${userId}`, {
        headers: {
          //"Content-Type": "application/json",
          Authorization: auth.token,
        },
      });
      //console.log(data)
      await getCounters(auth.id, auth.token);
      setVisitedProfile(false);
      //console.log(listFollowing)
    } catch (error) {
      console.log(error);
    }
  };


  // const viewNextPage=()=>{
  //   nextPage(params.userId!)
  // }

  useEffect(() => {
    //console.log('solouna vez')
    setVisitedProfile(isFollowed);
  }, [isFollowed]);


  const fetchPublication=async(page=1)=>{
    dispatch({type: "PUBLICATION - deletePublication"})
    await getPublication(params.userId!, page);
  }

  useEffect(() => {
    //getPublication(page);
    fetchPublication()
  }, [params.userId]);
//console.log(publication)
  //console.log({ visitedProfile });


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
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              border: 0,
            }}
          >
            <Grid item>
              <Box
                component="img"
                sx={{ height: 60, border: 0, paddingRight: 2 }}
                alt="Logo"
                src={
                  data.image === "default.png" || !data.image
                    ? avatar
                    : `http://127.0.0.1:3900/api/user/avatar/${data.image}`
                }
              />
            </Grid>
            <Grid item>
              <Typography variant="h2" component="h2" sx={{ fontWeight: 900 }}>
                {`${data.name} ${data.surname}`}
              </Typography>

              <Grid
                container
                spacing={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Grid item>
                  <Typography variant="h2" component="h2">
                    {`${data.nick}`}
                  </Typography>
                  <Typography variant="h2" component="h2">
                    {data.bio ? `${data.bio}` : ""}
                  </Typography>
                </Grid>
                <Grid item>
                  {auth.id !== data._id &&
                    (visitedProfile ? (
                      <>
                        <Button
                          color="error"
                          size="large"
                          variant="contained"
                          onClick={() => {
                            unFollowUser(data._id);
                          }}
                        >
                          Dejar de seguir
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          color="success"
                          size="large"
                          variant="contained"
                          onClick={() => {
                            followUser(data._id);
                          }}
                        >
                          Seguir
                        </Button>
                      </>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ marginLeft: 2, marginTop: 2 }}>
          <Grid
            container
            spacing={3}
            sx={{ alignItems: "center", justifyContent: "start" }}
          >
            <Grid item>
              <Link to={`/social/siguiendo/${params.userId!}`}>
                <Typography variant={"subtitle1"}>Siguiendo</Typography>
              </Link>
              <Typography variant={"h3"} textAlign={"center"}>
                {dataStats.following}
              </Typography>
            </Grid>
            <Grid item>
              <Link to={`/social/seguidores/${params.userId!}`}>
                <Typography variant={"subtitle1"}>Seguidores</Typography>
              </Link>
              <Typography variant={"h3"} textAlign={"center"}>
                {dataStats.followed}
              </Typography>
            </Grid>
            <Grid item>
              {/* <Link to={`/social/perfil/${profile.id}`}> */}
              <Typography variant={"subtitle1"}>Publicaciones</Typography>
              <Typography variant={"h3"} textAlign={"center"}>
                {dataStats.publication}
              </Typography>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider variant="middle" />

      <PublicationList/>

      
  
  
  

      
    </>
  );
};
