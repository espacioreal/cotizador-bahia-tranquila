import React, { createContext, useState, useContext } from 'react';

const CotizacionesContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useCotizaciones = () => {
  const context = useContext(CotizacionesContext);
  if (!context) {
    throw new Error('useCotizaciones debe usarse dentro de CotizacionesProvider');
  }
  return context;
};

// Provider del contexto
export const CotizacionesProvider = ({ children }) => {
  const [cotizaciones, setCotizaciones] = useState([]);

  // Función para agregar una nueva cotización al historial
  const agregarCotizacion = (cotizacion) => {
    const nuevaCotizacion = {
      ...cotizacion,
      id: Date.now(), // ID único basado en timestamp
      fecha: new Date().toLocaleString('es-AR')
    };
    
    setCotizaciones(prevCotizaciones => [nuevaCotizacion, ...prevCotizaciones]);
  };

  // Función para eliminar una cotización del historial
  const eliminarCotizacion = (id) => {
    setCotizaciones(prevCotizaciones => 
      prevCotizaciones.filter(cot => cot.id !== id)
    );
  };

  // Función para limpiar todo el historial
  const limpiarHistorial = () => {
    setCotizaciones([]);
  };

  // Valores y funciones que se compartirán a través del contexto
  const value = {
    cotizaciones,
    agregarCotizacion,
    eliminarCotizacion,
    limpiarHistorial
  };

  return (
    <CotizacionesContext.Provider value={value}>
      {children}
    </CotizacionesContext.Provider>
  );
};