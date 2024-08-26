
import React from 'react';
import { Link} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Header = () => {
  const token = localStorage.getItem('authToken');

  
  const getTokenData = () => {
    if (token) {
      try {
        return jwtDecode(token); 
      } catch (e) {
        console.error('Error al decodificar el token', e);
        localStorage.removeItem('authToken'); 
        return null;
      }
    }
    return null;
  };

  const tokenData = getTokenData();
  const isClient = tokenData?.role === 'client';
  const isVeterinarian = tokenData?.role === 'veterinarian';

  return (
    <header>
      <nav>
        <ul>
        
        {isClient && (
          <>
            <li><Link to="/Home/client">Home</Link></li>
            <li><Link to="/Accessory/client">Accesorios</Link></li>
            <li><Link to="/Food/client">Comida</Link></li>
            <li><Link to="/Medicine/client">Medicinas</Link></li>
            <li><Link to="/Service/client">Servicios disponibles</Link></li>
            <li><Link to="/Toy/client">Juguetes</Link></li>
            <li><Link to="/Branches/client">Sucursales</Link></li>
            <li><Link to="/Schedule/client">Horarios</Link></li>
            <li><Link to="/Suggestion/client">Dejanos tus sugerencias</Link></li>
          </>
        )}

        
        {isVeterinarian && (
          <>
            <li><Link to="/Home/veterinarian">Home</Link></li>
            <li><Link to="/Accessory/veterinarian">Accesorios</Link></li>
            <li><Link to="/Food/veterinarian">Comida</Link></li>
            <li><Link to="/Medicine/veterinarian">Medicinas</Link></li>
            <li><Link to="/Service/veterinarian">Servicios</Link></li>
            <li><Link to="/Toy/veterinarian">Juguetes</Link></li>
          </>
        )}

       
        <li><Link to="/" onClick={() => {localStorage.removeItem('authToken');}}>Cerrar sesión</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
