import React from 'react';
import { AlertTriangle } from 'lucide-react';


const AlertaBanner = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-yellow-900">Información importante</h3>
          <p className="text-sm text-yellow-800 mt-1">
            Debido a los recientes eventos climáticos en Bahía Blanca (temporales de viento y tormentas severas), 
            hemos ajustado nuestras coberturas para brindarte mejor protección en zonas de mayor riesgo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertaBanner;