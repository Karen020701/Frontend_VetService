import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/Register.css'; 

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [specialty, setSpecialty] = useState(''); 
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const { role } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = role === 'client'
            ? 'http://localhost:3001/client/register'
            : 'http://localhost:3001/veterinarian/register';

        const data = role === 'client'
            ? { fullName, email, password, role }
            : { fullName, email, password, specialty, phoneNumber };

        try {
            await axios.post(apiUrl, data);
            alert('Registro exitoso!');
            navigate(`/login/${role}`); 
        } catch (error) {
            console.error('Error al registrar', error);
            alert('Error al registrar. Por favor, verifica los datos ingresados.');
        }
    };

    return (
        <div className="register">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {role === 'veterinarian' && (
                    <>
                        <input
                            type="text"
                            placeholder="Especialidad"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Número de Teléfono"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </>
                )}
                <button type="submit">Registrarse</button>
                <p>¿Ya tienes cuenta? <a href={`/login/${role}`}>Inicia sesión aquí</a></p>
            </form>
        </div>
    );
}

export default Register;
