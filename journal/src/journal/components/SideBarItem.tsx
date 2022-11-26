import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Note, setSelectedNote } from "../../store/journal";


export const SideBarItem = ({ id,title, body,date }: Note) => {
  const newBody = body.length > 17 ? body.substring(0, 17) + "..." : body;
  const newTitle = title.length > 17 ? title.substring(0, 17) + "..." : title;
  const dispatch=useDispatch();
 

   const selectedNote =()=>{
  
    const selectedNoteObj:Note={
      id,
      title, 
      body,
      date
    }

    dispatch(setSelectedNote(selectedNoteObj))
   }

  return (
    <ListItem>
      <ListItemButton onClick={()=>{
        
        return selectedNote()
      }}>
        <ListItemIcon>
          {/* Icono */}
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />

          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
