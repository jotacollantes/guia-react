import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { redSocialApi } from "../../api/redSocialApi";
import { useAuth } from "../../hooks/useAuth";
import { PeopleItem, User } from "../user/PeopleItem";
import { useGetProfileUser } from '../../hooks/useGetProfileUser';

export const Following =() => {
  const { auth,listFollowing, setListFollowing } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const params= useParams()
  const {data} = useGetProfileUser(params.userId!,auth.token)
  

  const getUsers = async (nextPage: number) => {
    let newUsers;
    //console.log({nextPage})

    setTimeout(async () => {
      try {
        const { data } = await redSocialApi.get(`/follow/following/${params.userId}/${nextPage}`, {
          headers: {
            //"Content-Type": "application/json",
            Authorization: auth.token,
          },
        });
        //console.log(data.listaFollowing);
        //Creamos un nuevo arreglo barriendo la propiedad listaFollowing para obtener los usuarios seguidos
         let clearList=[]
         for (const follow of data.listaFollowing) {
            clearList.push(follow.followed)
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

        //console.log(users)
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  };


  
  
  useEffect(() => {
    
    
    getUsers(page);
    
  }, []);

  const nextPage = () => {
    let next;
    setLoading(true);
    next = page + 1;
    setPage(next);

    getUsers(next);
    
    //console.log(nextPage,totalPages)
  };


  //console.log(userProfile)
  
  return (
    <>
    <Typography variant="h1" component={'h1'}>{`Usuarios que sigue el usuario ${data.name } ${data.surname}`} </Typography>
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