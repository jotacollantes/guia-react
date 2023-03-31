import { useEffect, useState } from "react";
import { redSocialApi } from "../api";

export const useGetCountersUser = (userId: string, token: string) => {
  const [state, setState] = useState<any>({
    data: {},
    isloading: true,
    hasError: false,
  });
  
  const getCountersNow = async () => {
    //setTimeout(async() => {
    try {
      const { data } = await redSocialApi.get(`user/counter/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      
        setState({
          data: data,
          isloading: false,
        });
      
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
    getCountersNow();
  }, [userId, token]);
  return {
    data: state.data,
    isLoading: state.isloading,
    hasError: state.hasError,
  };
};