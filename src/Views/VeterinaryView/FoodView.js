import React, { useState, useEffect } from 'react';
import { createFood, deleteFood, listFood, updateFood } from '../../Services/FoodService';

function FoodCRUD() {
  const [foodData, setFoodData] = useState([]);
  const [form, setForm] = useState({
    id: '',
    descrip: '',
    type: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateFood = async () => {
    try {
      const data = await createFood(form);
      alert(`Comida creada con ID: ${data.id}`);
      fetchFoodData();
      clearForm(); // Limpia el formulario después de crear
    } catch (error) {
      alert('Error al crear comida');
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      await deleteFood(id);
      alert(`Comida con ID: ${id} eliminada`);
      fetchFoodData();
    } catch (error) {
      alert('Error al eliminar comida');
    }
  };

  const handleUpdateFood = async () => {
    if (!form.id) {
      alert('Por favor, seleccione una comida para actualizar.');
      return;
    }
    try {
      const data = await updateFood(form.id, form);
      alert(data.message);
      fetchFoodData();
      clearForm(); // Limpia el formulario después de actualizar
    } catch (error) {
      alert('Error al actualizar comida');
    }
  };

  const fetchFoodData = async () => {
    try {
      const data = await listFood();
      setFoodData(data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const handleEdit = (food) => {
    setForm({
      id: food.id,
      descrip: food.descrip,
      type: food.type,
      price: food.price,
      quantity: food.quantity
    });
  };

  const clearForm = () => {
    setForm({
      id: '',
      descrip: '',
      type: '',
      price: '',
      quantity: ''
    });
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  return (
    <div>
      <h1>Comida</h1>
      <div>
        <input
          type="text"
          name="descrip"
          placeholder="Descripción"
          onChange={handleChange}
          value={form.descrip}
        />
        <input
          type="text"
          name="type"
          placeholder="Tipo"
          onChange={handleChange}
          value={form.type}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          onChange={handleChange}
          value={form.price}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Cantidad"
          onChange={handleChange}
          value={form.quantity}
        />
        <button onClick={handleCreateFood}>Crear Comida</button>
        <button onClick={handleUpdateFood}>Actualizar Comida</button>
      </div>
      <h2>Lista de Comida</h2>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {foodData.map(food => (
            <tr key={food.id}>
              <td>{food.descrip}</td>
              <td>{food.type}</td>
              <td>${food.price}</td>
              <td>{food.quantity}</td>
              <td>
                <button onClick={() => handleEdit(food)}>Editar</button>
                <button onClick={() => handleDeleteFood(food.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodCRUD;
