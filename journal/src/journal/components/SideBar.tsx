import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Note } from '../../store/journal'
import { SideBarItem } from './'


export const SideBar = ({drawerWidth=240}) => {

    const {displayName}=useSelector((state:RootState)=>state.authReducer)
    const {notes} =useSelector((state:RootState)=>state.journalReducer)
    //console.log(notes.length)
  return (
    // Box es equivalente a Div
    <Box>
        <Drawer
        variant='permanent'
        open={true}
        sx={{
            display:{xs:'block'},
            '& .MuiDrawer-paper': {boxSizing:'border-box',width:drawerWidth}
        }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                    </Typography>
            </Toolbar>
            <Divider />
            <List>
                {
                    notes.map( (note,index:number)=>
                    {
                        return <SideBarItem key={index}  id={note.id} title={note.title} body={note.body} date={note.date} imageUrls={note.imageUrls}/>
                    }
                       
                    )
                }
            </List>
            
        </Drawer>
    </Box>
  )
}
