'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

// URL de tu API en MockAPI
const API_URL = 'https://67252ed8c39fedae05b4299f.mockapi.io/items';

// Crea el contexto
const CrudContext = createContext();

// Proveedor del contexto
export const CrudProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Cargar datos desde MockAPI
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
      console.log(items);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Agregar un nuevo ítem
  const addItem = async (item) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const newItem = await response.json();
      setItems([...items, newItem]);
    } catch (error) {
      console.error('Error al agregar el ítem:', error);
    }
  };

  // Actualizar un ítem existente
  const updateItem = async (id, updatedItem) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
    } catch (error) {
      console.error('Error al actualizar el ítem:', error);
    }
  };

  // Eliminar un ítem
  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar el ítem:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <CrudContext.Provider value={{ items, addItem, updateItem, deleteItem }}>
      {children}
    </CrudContext.Provider>
  );
};

// Hook para usar el contexto
export const useCrud = () => useContext(CrudContext);
