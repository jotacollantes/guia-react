import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { redSocialApi } from "../../api/redSocialApi";
import { useAuth } from "../../hooks/useAuth";
import { PeopleItem, User } from "./PeopleItem";

export const People = () => {
  const { auth,listFollowing, setListFollowing } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  //const [listFollowing, setListFollowing] = useState<string[]>([]);

  const getUsers = async (nextPage: number) => {
    let newUsers;
    //console.log({nextPage})

    setTimeout(async () => {
      try {
        const { data } = await redSocialApi.get(`/user/list/${nextPage}`, {
          headers: {
            //"Content-Type": "application/json",
            Authorization: auth.token,
          },
        });
        //console.log(data.following);

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

  useEffect(() => {
    //console.log("entro");
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

  
  return (
    <>
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
