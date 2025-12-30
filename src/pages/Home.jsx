import React, { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';
import Resultado from '../components/Resultado';
import cotizador from '../helpers/cotizador';


const Home = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipoPropiedad: 'casa',
    ubicacion: 'centro',
    metrosCuadrados: ''
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (resultado) {
      setResultado(null);
    }
  }, [formData.tipoPropiedad, formData.ubicacion, formData.metrosCuadrados]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = cotizador.validar(formData);
    
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setLoading(true);
    setResultado(null);

    setTimeout(() => {
      const cotizacion = cotizador.calcular(formData);
      setResultado(cotizacion);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Banner informativo */}
      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <h5 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '1.125rem', 
          color: '#856404',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          Información importante
        </h5>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#856404' }}>
          Debido a los recientes eventos climáticos en Bahía Blanca (temporales de viento y tormentas), 
          hemos ajustado nuestras coberturas para brindarte mejor protección en zonas de mayor riesgo.
        </p>
      </div>

      {/* Card principal */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)'
      }}>
        {/* Header del card */}
        <div style={{
          padding: '1.25rem',
          borderBottom: '1px solid #dee2e6',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '500' }}>
            Cotizá tu seguro en 3 simples pasos
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#6c757d' }}>
            Completá el formulario y obtené una cotización personalizada al instante
          </p>
        </div>

        {/* Formulario */}
        <Formulario 
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errores={errores}
        />

        {/* Loading */}
        {loading && (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            borderTop: '1px solid #dee2e6'
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #007bff',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ color: '#6c757d', margin: 0 }}>Calculando tu cotización...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
          </div>
        )}

        {/* Resultado */}
        {resultado && !loading && (
          <Resultado resultado={resultado} formData={formData} />
        )}
      </div>
    </div>
  );
};

export default Home;