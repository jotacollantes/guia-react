import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";


interface Props {
  links: {
    title: string;
    href: string;
    icon?: any;
   
  }[];
  setOpen: (arg0: boolean)=>void 
}
export const NavListDrawer = ({ links,setOpen }: Props) => {
  return (
    <Box sx={{ width: 250 }}>
      <Divider />
      <nav>
        <List>
          {links.map((item, ix) => {
            return (
              <ListItem disablePadding key={ix}>
                <ListItemButton
                component={NavLink}
                to={item.href}
                onClick={()=>{
                  return setOpen(false)
                }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title}></ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
};
