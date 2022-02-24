import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import NavBar from '../../components/NavBar';
import { typesNavBar } from '../../types';
import HomeComponent from '../../components/HomeComponent';
import PerfilComponent from '../../components/PerfilComponent';
import CarritoComponent from '../../components/CarritoComponent';

const Home = (props) => {

  const [valueNavigation, setValueNavigation] = React.useState(typesNavBar.Home);


  


  
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: '100vw',
          height: '100vh',
        },
      }}
    >
      <Paper variant="outlined" >
        <NavBar 
          state={props.state}
          valueNavigation={valueNavigation}
          setValueNavigation={setValueNavigation} 
        />
        {valueNavigation===typesNavBar.Home ? <HomeComponent/>:null}
        {valueNavigation===typesNavBar.Perfil ? <PerfilComponent />: null}
        {valueNavigation===typesNavBar.Carrito ? <CarritoComponent />: null}
        </Paper>
    </Box>
  )
}

export default Home




