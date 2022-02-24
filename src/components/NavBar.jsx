import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { typesNavBar } from '../types';

export default function NavBar(props) {  


    React.useEffect(() => {
        console.log(props.state)
        props.setValueNavigation(props.state)
    }, [])
    

    const handleChangeNavigation = (event, newValue) => {
        props.setValueNavigation(newValue);
    };

  return (
    <BottomNavigation sx={{ width: '100vw' }} value={props.valueNavigation} onChange={handleChangeNavigation}>
      <BottomNavigationAction
        label="Home"
        value={typesNavBar.Home}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Perfil"
        value={typesNavBar.Perfil}
        icon={<FaceIcon />}
      />
      <BottomNavigationAction
        label="Carrito"
        value={typesNavBar.Carrito}
        icon={<ShoppingCartIcon />}
      />
    </BottomNavigation>
  );
}


