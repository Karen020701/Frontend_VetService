import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/Login.css'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { role } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = role === 'client'
            ? 'http://localhost:3001/client/login'
            : 'http://localhost:3001/veterinarian/login';

            try {
                
                console.log('Enviando solicitud de inicio de sesión con:', { email, password });
            
                const response = await axios.post(apiUrl, { email, password });
            
                
                console.log('Respuesta del servidor:', response);
            
                localStorage.setItem('authToken', response.data.token);
                setMessage('Inicio de sesión exitoso');
            
                
                console.log('Redirigiendo a:', `/home/${role}`);
            
                setTimeout(() => {
                    navigate(`/home/${role}`);
                }, 1000);
            
            } catch (error) {
                
                console.error('Error al iniciar sesión:', error);
            
                setMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            }
            
    };

    return (
        <div className="login">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <button type="submit">Iniciar Sesión</button>
                {message && <p>{message}</p>}
                <p>¿No tienes cuenta? <a href={`/register/${role}`}>Regístrate aquí</a></p>
            </form>
        </div>
    );
}

export default Login;
