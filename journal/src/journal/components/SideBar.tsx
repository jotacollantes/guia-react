import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'


export const SideBar = ({drawerWidth=240}) => {

    const {displayName}=useSelector((state:RootState)=>state.authReducer)
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
                    ['Enero','Febrero','Marzo','Abril'].map(
                    (text:any,index:number)=>
                    {
                        return ( <ListItem key={index}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* Icono */}
                                    <TurnedInNot />
                                    
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={text}/>
                                        
                                    <ListItemText secondary={'Loremd sdfsdfjsdfjshdfhshdf sdf '}/>
                                </Grid>
                                
                            </ListItemButton>

                        </ListItem>)
                    }
                       
                    )
                }
            </List>
            
        </Drawer>
    </Box>
  )
}
