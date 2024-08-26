import React, { useState, useEffect } from 'react';
import { getAccessories, createAccessory, updateAccessory, deleteAccessory } from '../../Services/AccessoryService';

function AccessoryCRUD() {
  const [accessories, setAccessories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    type: '',
    price: '',
    quantity: ''
  });
  const [editingId, setEditingId] = useState(null);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const createAccessoryHandler = async () => {
    await createAccessory(form);
    alert('Accesorio creado');
    fetchAccessoriesData();
  };

 
  const updateAccessoryHandler = async () => {
    if (editingId) {
      await updateAccessory(editingId, form);
      alert('Accesorio actualizado');
      fetchAccessoriesData();
    }
  };

 
  const deleteAccessoryHandler = async (id) => {
    await deleteAccessory(id);
    alert(`Accesorio con ID: ${id} eliminado`);
    fetchAccessoriesData();
  };

  
  const fetchAccessoriesData = () => {
    loadAccessories();
  };

 
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
      <div>
        <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input type="text" name="type" placeholder="Tipo" value={form.type} onChange={handleChange} />
        <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleChange} />
        <input type="number" name="quantity" placeholder="Cantidad" value={form.quantity} onChange={handleChange} />
        <button onClick={editingId ? updateAccessoryHandler : createAccessoryHandler}>
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
      </div>
      <h2>Lista de Accesorios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accessories.map(accessory => (
            <tr key={accessory.id}>
              <td>{accessory.name}</td>
              <td>{accessory.type}</td>
              <td>{accessory.price}</td>
              <td>{accessory.quantity}</td>
              <td>
                <button onClick={() => {
                  setEditingId(accessory.id);
                  setForm({
                    name: accessory.name,
                    type: accessory.type,
                    price: accessory.price,
                    quantity: accessory.quantity
                  });
                }}>
                </button>
                <button onClick={() => deleteAccessoryHandler(accessory.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccessoryCRUD;
