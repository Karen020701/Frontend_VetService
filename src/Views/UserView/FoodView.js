import React, { useState, useEffect } from 'react';
import { listFood } from '../../Services/FoodService';

function FoodUser() {
  const [foodData, setFoodData] = useState([]);
  
  const fetchFoodData = async () => {
    const data = await listFood();
    setFoodData(data);
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  return (
    <div>
      <h1>Comida</h1>
      <h2>Lista de comida</h2>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {foodData.map(food => (
            <tr key={food.id}>
              <td>{food.descrip}</td>
              <td>{food.type}</td>
              <td>${food.price}</td>
              <td>{food.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        {foodData.map((food) => (
          <li key={food.id}>
            {food.descrip} - {food.type} - ${food.price} - {food.quantity} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodUser;
