import React, { useEffect, useState } from 'react';
import { listToys } from '../../Services/ToyService';

const ToyUser = () => {
    const [toys, setToys] = useState([]);

    useEffect(() => {
        fetchToys();
    }, []);

    const fetchToys = async () => {
        const toyList = await listToys();
        setToys(toyList);
    };

    return (
        <div>
            <h1>Juguetería</h1>
            <div>
                <h2>Lista de juguetes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toys.map(toy => (
                            <tr key={toy.id}>
                                <td>{toy.name}</td>
                                <td>{toy.type}</td>
                                <td>${toy.price}</td>
                                <td>{toy.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ToyUser;
