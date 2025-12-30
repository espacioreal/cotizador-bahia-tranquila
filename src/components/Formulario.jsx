import React from 'react';
import cotizador from '../helpers/cotizador';

const Formulario = ({ formData, onChange, onSubmit, errores }) => {
  const infoUbicacion = cotizador.factoresUbicacion[formData.ubicacion];

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem', 
          fontWeight: '500',
          fontSize: '0.875rem'
        }}>
          Nombre completo <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={onChange}
          placeholder="Ingresá tu nombre"
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            fontSize: '1rem',
            border: errores.nombre ? '1px solid #dc3545' : '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: errores.nombre ? '#f8d7da' : 'white',
            outline: 'none'
          }}
        />
        {errores.nombre && (
          <small style={{ color: '#dc3545', fontSize: '0.875rem' }}>
            {errores.nombre}
          </small>
        )}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem', 
          fontWeight: '500',
          fontSize: '0.875rem'
        }}>
          Tipo de Propiedad <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <select
          name="tipoPropiedad"
          value={formData.tipoPropiedad}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            fontSize: '1rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: 'white',
            outline: 'none'
          }}
        >
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="comercio">Comercio</option>
          <option value="oficina">Oficina</option>
        </select>
        <small style={{ fontSize: '0.75rem', color: '#6c757d' }}>
          Precio base: ${cotizador.preciosBase[formData.tipoPropiedad]} por m²
        </small>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem', 
          fontWeight: '500',
          fontSize: '0.875rem'
        }}>
          Ubicación en Bahía Blanca <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <select
          name="ubicacion"
          value={formData.ubicacion}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            fontSize: '1rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: 'white',
            outline: 'none'
          }}
        >
          <option value="centro">Centro</option>
          <option value="zonaNorte">Zona Norte</option>
          <option value="zonaSur">Zona Sur</option>
          <option value="otrosBarrios">Otros Barrios</option>
        </select>
        <div style={{
          marginTop: '0.5rem',
          padding: '0.75rem',
          backgroundColor: '#e7f3ff',
          border: '1px solid #b3d9ff',
          borderRadius: '4px'
        }}>
          <strong style={{ fontSize: '0.875rem', color: '#004085' }}>
            {infoUbicacion.descripcion}
          </strong>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#004085' }}>
            {infoUbicacion.info}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem', 
          fontWeight: '500',
          fontSize: '0.875rem'
        }}>
          Superficie (m²) <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <input
          type="number"
          name="metrosCuadrados"
          value={formData.metrosCuadrados}
          onChange={onChange}
          placeholder="Ej: 85"
          min="1"
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            fontSize: '1rem',
            border: errores.metrosCuadrados ? '1px solid #dc3545' : '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: errores.metrosCuadrados ? '#f8d7da' : 'white',
            outline: 'none'
          }}
        />
        {errores.metrosCuadrados && (
          <small style={{ color: '#dc3545', fontSize: '0.875rem' }}>
            {errores.metrosCuadrados}
          </small>
        )}
      </div>

      <button
        onClick={onSubmit}
        style={{
          width: '100%',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '500',
          color: 'white',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Calcular Cotización
      </button>
    </div>
  );
};

export default Formulario;