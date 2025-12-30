import React from 'react';
import { useCotizaciones } from '../context/CotizacionesContext';
import { useNavigate } from 'react-router-dom';

// ============================================
// COMPONENTE: Resultado
// ============================================
// Muestra el resultado de la cotización y permite guardarla

const Resultado = ({ resultado, formData }) => {
  const { agregarCotizacion } = useCotizaciones();
  const navigate = useNavigate();

  const handleGuardar = () => {
    // Guardamos la cotización con todos los datos
    agregarCotizacion({
      nombre: formData.nombre,
      tipoPropiedad: formData.tipoPropiedad,
      ubicacion: formData.ubicacion,
      metrosCuadrados: formData.metrosCuadrados,
      resultado: resultado
    });

    // Mostramos un alert de confirmación
    alert('¡Cotización guardada exitosamente!');
  };

  const handleVerHistorial = () => {
    navigate('/historial');
  };

  return (
    <div style={{
      padding: '1.5rem',
      borderTop: '1px solid #dee2e6',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #28a745',
        borderRadius: '4px',
        padding: '1.5rem'
      }}>
        <h4 style={{ 
          margin: '0 0 1rem 0', 
          color: '#28a745',
          fontSize: '1.25rem'
        }}>
          ¡Tu Cotización está lista, {formData.nombre}!
        </h4>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                Cobertura Base:
              </td>
              <td style={{ 
                padding: '0.75rem', 
                fontSize: '1rem',
                fontWeight: '600',
                textAlign: 'right'
              }}>
                ${resultado.cotizacionBase.toLocaleString('es-AR')} / mes
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: '0.875rem' }}>+ Cobertura Daños por Viento</div>
                <small style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                  Incluye destechados y roturas
                </small>
              </td>
              <td style={{ 
                padding: '0.75rem', 
                fontSize: '1rem',
                fontWeight: '600',
                textAlign: 'right'
              }}>
                ${resultado.coberturaViento.toLocaleString('es-AR')} / mes
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: '0.875rem' }}>+ Cobertura Tormentas/Granizo</div>
                <small style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                  Incluye tormentas eléctricas
                </small>
              </td>
              <td style={{ 
                padding: '0.75rem', 
                fontSize: '1rem',
                fontWeight: '600',
                textAlign: 'right'
              }}>
                ${resultado.coberturaTormenta.toLocaleString('es-AR')} / mes
              </td>
            </tr>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <td style={{ 
                padding: '1rem', 
                fontSize: '1.125rem',
                fontWeight: 'bold'
              }}>
                Total Mensual:
              </td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'right'
              }}>
                ${resultado.total.toLocaleString('es-AR')}
              </td>
            </tr>
          </tbody>
        </table>

        <p style={{
          margin: '1rem 0',
          fontSize: '0.75rem',
          color: '#6c757d',
          textAlign: 'center'
        }}>
          * Esta cotización es orientativa. Vigencia: 30 días.
        </p>

        {/* Botones de acción */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginTop: '1.5rem' 
        }}>
          <button
            onClick={handleGuardar}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: 'white',
              backgroundColor: '#28a745',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            💾 Guardar Cotización
          </button>

          <button
            onClick={handleVerHistorial}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: 'white',
              backgroundColor: '#17a2b8',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📋 Ver Historial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resultado;