import React, { useEffect, useState } from 'react';
import { listBranches } from '../../Services/BranchService';

const BranchCRUD = () => {
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {branches.map(branch => (
            <tr key={branch.id}>
              <td>{branch.id}</td>
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

export default BranchCRUD;
