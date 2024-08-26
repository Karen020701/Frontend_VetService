import React, { useState, useEffect } from 'react';
import { createMedicine, deleteMedicine, updateMedicine, fetchMedicines } from '../../Services/MedicineService';

function MedicineCRUD() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    name: '',
    usage: '',
    price: '',
    quantity: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMedicine(editingId, form);
      } else {
        await createMedicine(form);
      }
      setForm({ name: '', usage: '', price: '', quantity: '' });
      setEditingId(null);
      loadMedicines();
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  };

  const handleEdit = (medicine) => {
    setEditingId(medicine.id);
    setForm({
      name: medicine.name,
      usage: medicine.usage,
      price: medicine.price,
      quantity: medicine.quantity
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedicine(id);
      loadMedicines();
    } catch (error) {
      console.error('Error al eliminar la medicina:', error);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="usage"
          placeholder="Uso"
          value={form.usage}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: '', usage: '', price: '', quantity: '' });
              setEditingId(null);
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      <h2>Listado de Medicinas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Uso</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map(medicine => (
            <tr key={medicine.id}>
              <td>{medicine.name}</td>
              <td>{medicine.usage}</td>
              <td>${medicine.price}</td>
              <td>{medicine.quantity}</td>
              <td>
                <button onClick={() => handleEdit(medicine)}>Editar</button>
                <button onClick={() => handleDelete(medicine.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineCRUD;
