import React, { useEffect, useState } from 'react';
import { listBranches } from '../../Services/BranchService';

const BranchUser = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branches = await listBranches();
        setBranches(branches);
      } catch (err) {
        setError('Failed to fetch branches');
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Sucursales</h1>
      <h2>Lista de sucursales</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del establecimiento</th>
            <th>Dirección</th>
            <th>Número de contactos</th>
          </tr>
        </thead>
        <tbody>
          {branches.map(branch => (
            <tr key={branch.id}>
              <td>{branch.name}</td>
              <td>{branch.address}</td>
              <td>{branch.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchUser;
