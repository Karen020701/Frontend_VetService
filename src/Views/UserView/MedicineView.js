import React, { useState, useEffect } from 'react';
import { fetchMedicines } from '../../Services/MedicineService';

function MedicineUser() {
  const [medicines, setMedicines] = useState([]);
  
  const loadMedicines = async () => {
    try {
      const data = await fetchMedicines();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setMedicines([]);
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  return (
    <div>
      <h1>Medicinas</h1>
      <h2>Lista de medicinas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Uso</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map(medicine => (
            <tr key={medicine.id}>
              <td>{medicine.name}</td>
              <td>{medicine.usage}</td>
              <td>{medicine.price}</td>
              <td>{medicine.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul>
        {medicines.map(medicine => (
          <li key={medicine.id}>
            {medicine.name} - {medicine.usage} - ${medicine.price} - {medicine.quantity} unidades
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicineUser;
