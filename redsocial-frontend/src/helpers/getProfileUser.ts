import { redSocialApi } from "../api"

export const getProfileUser=async(userId:string,token:string)=>{
    try {
        const { data } = await redSocialApi.get(`user/profile/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
  
        if (data.status !== "success") {
          return false;
        }
        const { _id: id, nick, name, surname, email, image,bio } = data.userProfile;
        //Setear el estado profile
        return { id, name, surname, nick, email, image,bio };
        
      } catch (error) {
        console.log(error)
        return {};
      }
}