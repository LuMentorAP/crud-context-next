'use client'
import Link from "next/link";
import { useCrud } from "./context/Crudcontext";
import { useState } from 'react';

export default function Home() {
  const { items, addItem, updateItem, deleteItem } = useCrud();
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateItem(editId, { id: editId, ...formData });
      setEditId(null);
    } else {
      addItem(formData);
    }
    setFormData({ name: '', description: '' });
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, description: item.description });
    setEditId(item.id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD con Context API</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
  <input
    type="text"
    placeholder="Nombre"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    required
    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    placeholder="Descripción"
    value={formData.description}
    onChange={(e) =>
      setFormData({ ...formData, description: e.target.value })
    }
    required
    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    type="submit"
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  >
    {editId ? 'Actualizar' : 'Agregar'}
  </button>
</form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link  href={`/products/${item.id}`}>

            <strong>{item.name}</strong>: {item.description}{' '}
            </Link>
            <button onClick={() => handleEdit(item)}>Editar</button>
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
