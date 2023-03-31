import { useEffect, useState } from "react";
import { useAuth } from ".";
import { redSocialApi } from "../api";

export const useGetProfileUser = (userId: string, token: string) => {
  const { auth } = useAuth();
  const [state, setState] = useState<any>({
    data: {},
    isloading: true,
    hasError: false,
    isFollowed: false
  });

  const getProfileNow = async () => {
    //setTimeout(async() => {
    try {
      const { data } = await redSocialApi.get(`user/profile/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (data.status === "success") {
        // const infoProfile={user:{},isFollowed:false}
        // infoProfile.user=data.userProfile
        // infoProfile.isFollowed=(auth.id===data.following.user) ? true : false
        //console.log({infoProfile})
        let followed=false
        // Si data.following tiene informacion del usuario que esta en la sesion es porque lo sigue caso contrario sino lo sigue data.following es NULL
        if (data.following)
        {
          followed=true
        }
        

        setState({
          data: data.userProfile,
          isFollowed: followed,
          isloading: false,
        });
      }
    } catch (error) {
      setState({
        ...state,
        isloading: false,
        hasError: true,
      });
      console.log(error);
      //return false;
    }
    //}, 2000);
  };

  useEffect(() => {
    getProfileNow();
  }, [userId, token]);
  return {
    //data: state.data,
    //isFollowed: state.isFollowed,
    //isLoading: state.isloading,
    //hasError: state.hasError,
    ...state
    
    
  };
};
