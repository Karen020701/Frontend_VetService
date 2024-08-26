import React, { useEffect, useState } from 'react';
import { connectWebSocket } from '../../Services/ServiceService';

const ServiceCRUD = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const ws = connectWebSocket((data) => {
      if (Array.isArray(data)) {
        setServices(data);
      }
    });

    return () => {
      ws.close();
    };
  }, []);

  const handleEdit = (service) => {
    // Implement editing logic here
    setSelectedService(service);
    // This could involve setting state or opening a modal
  };

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log(`Delete service with ID: ${id}`);
    // Example: Call a delete service method and update the state
  };

  return (
    <div>
      <h1>Servicios disponibles</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>
                <button onClick={() => handleEdit(service)}>Editar</button>
                <button onClick={() => handleDelete(service.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceCRUD;
