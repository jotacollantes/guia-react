
import reactLogo from './assets/react.svg'
import  './assets/fonts/fontawesome-free-6.1.2-web/css/all.css'
import './assets/css/normalize.css'
import './assets/css/styles.css'
import './assets/css/responsive.css'
import { Container, Typography } from '@mui/material'
import { Box, flexbox } from '@mui/system'
import { RedSocialRoting } from './router/RedSocialRoting'

function App() {
  

  return (
   <>
   
    {/* <Box sx={{display:'flex',justifyContent:'center' }}>
      <Typography variant='h1' component={'h1'}>Proyecto red social</Typography>
    </Box> */}
    
    <RedSocialRoting/>
     </>
      
  )
}

export default App
