import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/RoleSelection.css';

function RoleSelection() {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        navigate(`/login/${role}`);
    };

    return (
        <div className="role-selection">
            <h1>Bienvenido a VetService</h1>
            <h2>Selecciona tu Rol</h2>
            <button onClick={() => handleRoleSelection('client')}>Iniciar Sesión como Cliente</button>
            <button onClick={() => handleRoleSelection('veterinarian')}>Iniciar Sesión como Veterinario</button>
        </div>
    );
}

export default RoleSelection;
