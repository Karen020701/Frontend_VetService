import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Home.css'

function VeterinarianHome() {
    const [veterinarian, setVeterinarian] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken'); 

    useEffect(() => {
        if (!token) {
            navigate('/login/veterinarian');
            return;
        }

        const fetchVeterinarianData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/veterinarian/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setVeterinarian(response.data.veterinarian);
            } catch (error) {
                console.error('Error al obtener datos del veterinario', error);
            }
        };

        fetchVeterinarianData();
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        navigate('/login/veterinarian');
    };

    return (
        <div className="home-container">
            <h2>Bienvenido</h2>
            <div className="image-container"></div>
        </div>
    );
}


export default VeterinarianHome;
