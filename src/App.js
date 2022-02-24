import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { typesNavBar } from './types';



function App() {



  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home state={typesNavBar.Home} />} />
            <Route path='/perfil' element={<Home state={typesNavBar.Perfil} />} />
            <Route path='/carrito' element={<Home state={typesNavBar.Carrito} />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
