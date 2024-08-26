
import React, { useEffect, useState } from 'react';
import { connectWebSocket } from '../../Services/ServiceService';

const ServiceUser = () => {
  const [services, setServices] = useState([]);

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

  return (
    <div>
      <h1>Servicios disponibles</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceUser;
