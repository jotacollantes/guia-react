import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { BlockBusterLayout } from '../components/layouts'
import { CartContext } from '../context/cart';

export const Confirmation = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {closeOrder} = useContext(CartContext)
   
   
    
    useEffect(() => {
        //setIsLoading(true);
        setTimeout(() => {
          
          setIsLoading(false);
        }, 2000);
        closeOrder();
         //! Reseteo el state del reducer y limpio el localstorage 
      }, []);
     
  return (
      
    <BlockBusterLayout>

        {
            isLoading ? (
                <Box
    display={'flex'}
    justifyContent='center'
    alignItems='center'
    flexDirection={'column'}
    height={'calc(100vh - 200px)'}
    >
    <Typography sx={{mb:5}} variant='h2' fontWeight={200} fontSize={20}>Procesando su Orden...</Typography>
    <CircularProgress thickness={4}/>
    
      </Box>
            ):
            (<Box
                display={'flex'}
                justifyContent='center'
                alignItems='center'
                flexDirection={'column'}
                height={'calc(100vh - 200px)'}
                
                >
                <Typography sx={{mb:5}} variant='h2' fontWeight={200} fontSize={20}>Su orden ha sido Procesada.</Typography>
                
                
                  </Box>)
        }
        
      </BlockBusterLayout>
  )
}
