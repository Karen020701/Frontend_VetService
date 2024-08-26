import React, { useEffect, useState } from 'react';
import { createToy, listToys, updateToy } from '../../Services/ToyService';

const ToyCRUD = () => {
    const [toys, setToys] = useState([]);
    const [newToy, setNewToy] = useState({ name: '', type: '', price: '', quantity: '' });
    const [editToyId, setEditToyId] = useState(null);

    useEffect(() => {
        fetchToys();
    }, []);

    const fetchToys = async () => {
        const toyList = await listToys();
        setToys(toyList);
    };

    const handleCreateToy = async () => {
        await createToy(newToy);
        setNewToy({ name: '', type: '', price: '', quantity: '' });
        fetchToys();
    };

    const handleUpdateToy = async (id) => {
        const updatedToy = toys.find(toy => toy.id === id);
        await updateToy(id, updatedToy);
        setEditToyId(null);
        fetchToys();
    };

    return (
        <div>
            <h1>Jugueteria</h1>
            <div>
                <h2>Create New Toy</h2>
                <input type="text" placeholder="Name" value={newToy.name} onChange={e => setNewToy({ ...newToy, name: e.target.value })} />
                <input type="text" placeholder="Type" value={newToy.type} onChange={e => setNewToy({ ...newToy, type: e.target.value })} />
                <input type="number" placeholder="Price" value={newToy.price} onChange={e => setNewToy({ ...newToy, price: e.target.value })} />
                <input type="number" placeholder="Quantity" value={newToy.quantity} onChange={e => setNewToy({ ...newToy, quantity: e.target.value })} />
                <button onClick={handleCreateToy}>Create Toy</button>
            </div>

            <div>
                <h2>Toy List</h2>
                <ul>
                    {toys.map(toy => (
                        <li key={toy.id}>
                            {editToyId === toy.id ? (
                                <>
                                    <input type="text" value={toy.name} onChange={e => setToys(toys.map(t => t.id === toy.id ? { ...t, name: e.target.value } : t))} />
                                    <input type="text" value={toy.type} onChange={e => setToys(toys.map(t => t.id === toy.id ? { ...t, type: e.target.value } : t))} />
                                    <input type="number" value={toy.price} onChange={e => setToys(toys.map(t => t.id === toy.id ? { ...t, price: e.target.value } : t))} />
                                    <input type="number" value={toy.quantity} onChange={e => setToys(toys.map(t => t.id === toy.id ? { ...t, quantity: e.target.value } : t))} />
                                    <button onClick={() => handleUpdateToy(toy.id)}>Save</button>
                                    <button onClick={() => setEditToyId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {toy.name} - {toy.type} - ${toy.price} - {toy.quantity}
                                    <button onClick={() => setEditToyId(toy.id)}>Edit</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToyCRUD;
