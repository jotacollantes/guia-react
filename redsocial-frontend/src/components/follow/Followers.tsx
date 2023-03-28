import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { redSocialApi } from "../../api/redSocialApi";
import { useAuth } from "../../hooks/useAuth";
import { PeopleItem, User } from "../user/PeopleItem";
import { getProfileUser } from "../../helpers/getProfileUser";

export const Followers = () => {
  const { auth,listFollowing, setListFollowing } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userProfile,setUserProfile]=useState<any>({})
  //const [listFollowing, setListFollowing] = useState<string[]>([]);
  const params= useParams()

  const getUsers = async (nextPage: number) => {
    let newUsers;
    //console.log({nextPage})

    setTimeout(async () => {
      try {
        const { data } = await redSocialApi.get(`/follow/followers/${params.userId}/${nextPage}`, {
          headers: {
            //"Content-Type": "application/json",
            Authorization: auth.token,
          },
        });
        //console.log(data.listaFollowing);
        //Creamos un nuevo arreglo barriendo la propiedad listaFollowers para obtener los usuarios seguidos
         let clearList=[]
         for (const follow of data.listaFollowers) {
            clearList.push(follow.user)
         }
         //Creamos la propiedad data.listUsers para asignarle el array creado en clearList 
        data.listUsers=clearList
        //console.log(clearList)
        
        if (users.length >= 1) {
          newUsers = [...users, ...data.listUsers];
        } else {
          newUsers = data.listUsers;
        }
        //console.log({newUsers})
        setUsers(newUsers);
        setTotalPages(data.pages);
        setListFollowing(data.following);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  };
  const getUserProfile=async(userId:string,token:string)=>{
    const profileUser=await getProfileUser(userId,token)
    setUserProfile(profileUser)
}
  useEffect(() => {
    //console.log("entro");
    getUsers(page);
    getUserProfile(params.userId!,auth.token)
  }, []);

  const nextPage = () => {
    let next;
    setLoading(true);
    next = page + 1;
    setPage(next);

    getUsers(next);

    //console.log(nextPage,totalPages)
  };

  
  return (
    <>
    <Typography variant="h1" component={'h1'}>{`Usuarios que sigue a ${userProfile.name} ${userProfile.surname}`} </Typography>
      {loading ? "Cargando..." : ""}

      {users.map((user: User, ix) => {
        let following = false;
        if (listFollowing.includes(user._id)) {
          following = true;
        }

        return (
        
          <PeopleItem user={user} following={following} key={ix}/>
        
        );
      })}
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 3,
        }}
      >
        {
          //Page por defecto tiene valor 1
          page < totalPages && (
            <Grid item>
              <Button
                color="primary"
                size="large"
                variant="contained"
                onClick={nextPage}
              >
                Ver Mas personas
              </Button>
            </Grid>
          )
        }
      </Grid>
    </>
  );
};