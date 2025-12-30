import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCotizaciones } from '../context/CotizacionesContext';

const Historial = () => {
  const navigate = useNavigate();
  const { cotizaciones, eliminarCotizacion, limpiarHistorial } = useCotizaciones();

  const handleVolver = () => {
    navigate('/');
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cotización?')) {
      eliminarCotizacion(id);
    }
  };

  const handleLimpiarTodo = () => {
    if (window.confirm('¿Estás seguro de eliminar TODAS las cotizaciones?')) {
      limpiarHistorial();
    }
  };

  // Función helper para formatear el tipo de propiedad
  const formatearTipoPropiedad = (tipo) => {
    const tipos = {
      casa: 'Casa',
      departamento: 'Departamento',
      comercio: 'Comercio',
      oficina: 'Oficina'
    };
    return tipos[tipo] || tipo;
  };

  // Función helper para formatear la ubicación
  const formatearUbicacion = (ubicacion) => {
    const ubicaciones = {
      centro: 'Centro',
      zonaNorte: 'Zona Norte',
      zonaSur: 'Zona Sur',
      otrosBarrios: 'Otros Barrios'
    };
    return ubicaciones[ubicacion] || ubicacion;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.75rem', fontWeight: 'bold' }}>
              📋 Historial de Cotizaciones
            </h2>
            <p style={{ margin: 0, color: '#6c757d', fontSize: '0.875rem' }}>
              Total: {cotizaciones.length} cotización{cotizaciones.length !== 1 ? 'es' : ''}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {cotizaciones.length > 0 && (
              <button
                onClick={handleLimpiarTodo}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: '#dc3545',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🗑️ Limpiar Todo
              </button>
            )}
            
            <button
              onClick={handleVolver}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'white',
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ← Volver al Inicio
            </button>
          </div>
        </div>
      </div>

      {/* Lista de cotizaciones */}
      {cotizaciones.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#6c757d' }}>
            No hay cotizaciones guardadas
          </h3>
          <p style={{ margin: 0, color: '#6c757d', fontSize: '0.875rem' }}>
            Realizá una cotización y guardala para verla aquí
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {cotizaciones.map((cotizacion) => (
            <div
              key={cotizacion.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                padding: '1.5rem',
                boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)'
              }}
            >
              {/* Header de la cotización */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #dee2e6'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>
                    {cotizacion.nombre}
                  </h4>
                  <small style={{ color: '#6c757d', fontSize: '0.875rem' }}>
                    🕐 {cotizacion.fecha}
                  </small>
                </div>
                
                <button
                  onClick={() => handleEliminar(cotizacion.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    color: '#dc3545',
                    backgroundColor: 'white',
                    border: '1px solid #dc3545',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>

              {/* Datos de la propiedad */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <div>
                  <strong style={{ fontSize: '0.75rem', color: '#6c757d' }}>TIPO:</strong>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
                    {formatearTipoPropiedad(cotizacion.tipoPropiedad)}
                  </p>
                </div>
                <div>
                  <strong style={{ fontSize: '0.75rem', color: '#6c757d' }}>UBICACIÓN:</strong>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
                    {formatearUbicacion(cotizacion.ubicacion)}
                  </p>
                </div>
                <div>
                  <strong style={{ fontSize: '0.75rem', color: '#6c757d' }}>SUPERFICIE:</strong>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
                    {cotizacion.metrosCuadrados} m²
                  </p>
                </div>
              </div>

              {/* Resumen del costo */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px'
              }}>
                <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                  Total Mensual:
                </span>
                <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                  ${cotizacion.resultado.total.toLocaleString('es-AR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Historial;