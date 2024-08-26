import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelection from './RoleSelection';
import Login from './Views/Login';
import Register from './Views/Register';
import ClientHome from './Views/ClientHome';
import VeterinarianHome from './Views/VeterinarianHome';
import {jwtDecode} from 'jwt-decode'; 
import AccessoryCRUD from './Views/VeterinaryView/AccessoryView';
import FoodCRUD from './Views/VeterinaryView/FoodView';
import MedicineCRUD from './Views/VeterinaryView/MedicineView';
import ServiceCRUD from './Views/VeterinaryView/ServiceView';
import ToyCRUD from './Views/VeterinaryView/ToyView';
import AccessoryUser from './Views/UserView/AccessoryView';
import FoodUser from './Views/UserView/FoodView';
import MedicineUser from './Views/UserView/MedicineView';
import ServiceUser from './Views/UserView/ServiceView';
import ToyUser from './Views/UserView/ToyView';
import BranchUser from './Views/UserView/BranchView';
import ScheduleUser from './Views/UserView/SchedulesView';
import SuggestionUser from './Views/UserView/SuggestionView';
import Layout from './Componentes/Layout';
import './App.css'

function App() {
    const token = localStorage.getItem('authToken');

   
    const getTokenData = () => {
        if (token) {
            try {
                return jwtDecode(token); 
            } catch (e) {
                console.error('Error al decodificar el token', e);
                localStorage.removeItem('authToken'); 
                return null;
            }
        }
        return null;
    };

    const tokenData = getTokenData();
    const isClient = tokenData?.role === 'client';
    const isVeterinarian = tokenData?.role === 'veterinarian';

    return (
        <Router>
            <Routes>
                <Route path="/" element={<RoleSelection />} />
                <Route path="/login/:role" element={<Login />} />
                <Route path="/register/:role" element={<Register />} />
                <Route path="/" element={<Layout />}>
                
                <Route path="/home/client" element={isClient ? <ClientHome /> : <Navigate to="/login/client" />} />
                <Route path="/Accessory/client" element={isClient ? <AccessoryUser /> : <Navigate to="/home/client" />} />
                <Route path="/Food/client" element={isClient ? <FoodUser /> : <Navigate to="/home/client" />} />
                <Route path="/Medicine/client" element={isClient ? <MedicineUser /> : <Navigate to="/home/client" />} />
                <Route path="/Service/client" element={isClient ? <ServiceUser /> : <Navigate to="/home/client" />} />
                <Route path="/Toy/client" element={isClient ? <ToyUser /> : <Navigate to="/home/client" />} />
                <Route path="/Branches/client" element={isClient ? <BranchUser /> : <Navigate to="/home/client" />} />
                <Route path="/Schedule/client" element={isClient ? <ScheduleUser /> : <Navigate to="/home/client" />} />
                <Route path="/Suggestion/client" element={isClient ? <SuggestionUser /> : <Navigate to="/home/client" />} />

               
                <Route path="/home/veterinarian" element={isVeterinarian ? <VeterinarianHome /> : <Navigate to="/login/veterinarian" />} />
                <Route path="/Accessory/veterinarian" element={isVeterinarian ? <AccessoryCRUD /> : <Navigate to="/home/veterinarian" />} />
                <Route path="/Food/veterinarian" element={isVeterinarian ? <FoodCRUD /> : <Navigate to="/home/veterinarian" />} />
                <Route path="/Medicine/veterinarian" element={isVeterinarian ? <MedicineCRUD /> : <Navigate to="/home/veterinarian" />} />
                <Route path="/Service/veterinarian" element={isVeterinarian ? <ServiceCRUD /> : <Navigate to="/home/veterinarian" />} />
                <Route path="/Toy/veterinarian" element={isVeterinarian ? <ToyCRUD /> : <Navigate to="/home/veterinarian" />} />

                
                <Route path="*" element={<Navigate to="/" />} />
              </Route>  
            </Routes>
        </Router>

    );
}

export default App;
