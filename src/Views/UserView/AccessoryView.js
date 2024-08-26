import React, { useState, useEffect } from 'react';
import { getAccessories } from '../../Services/AccessoryService';

function AccessoryUser() {
  const [accessories, setAccessories] = useState([]);
  

  const loadAccessories = async () => {
    try {
      const accessoriesList = await getAccessories();
      setAccessories(accessoriesList);
    } catch (error) {
      console.error('Error fetching accessories:', error);
      setAccessories([]); 
    }
  };

  useEffect(() => {
    loadAccessories();
  }, []);

  return (
    <div>
      <h1>Accesorios</h1>
      <h2>Lista de Accesorios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {accessories.map(accessory => (
            <tr key={accessory.id}>
              <td>{accessory.name}</td>
              <td>{accessory.type}</td>
              <td>{accessory.price}</td>
              <td>{accessory.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccessoryUser;
