import { Box, Container } from "@mui/material";



interface Props {
  children: JSX.Element | JSX.Element[];
}
export const RedSocialLayout = ({ children }: Props) => {
  return (
   
   
      
    
    
    <Box sx={{ display: "flex" }}>
      
      
      {/* navbar drawerWidth*/}

    

      
        {children}
     
    </Box>
    
  );
};