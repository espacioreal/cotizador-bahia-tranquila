import React from 'react';

// ============================================
// COMPONENTE: Spinner de Carga
// ============================================
// Indicador visual durante el procesamiento de la cotización.
// Mejora la UX al dar feedback inmediato al usuario.
// Usamos animaciones de Tailwind para el efecto de rotación.

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      <p className="text-gray-600 mt-4 font-medium">Calculando tu cotización...</p>
    </div>
  );
};

export default Spinner;