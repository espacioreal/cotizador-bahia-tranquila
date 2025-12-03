import React, { useState, useEffect } from 'react';

const cotizador = {
  preciosBase: {
    casa: 150,
    departamento: 120,
    comercio: 200,
    oficina: 180
  },
  factoresUbicacion: {
    centro: { 
      factor: 1.0, 
      descripcion: 'Zona protegida - Sin recargo adicional',
      info: 'Infraestructura consolidada con menor exposición'
    },
    zonaNorte: { 
      factor: 1.15, 
      descripcion: 'Zona afectada por temporales recientes (+15% riesgo)',
      info: 'Mayor exposición a vientos del norte'
    },
    zonaSur: { 
      factor: 1.20, 
      descripcion: 'Zona de alta exposición a vientos (+20% riesgo)',
      info: 'Zona costera con mayor vulnerabilidad climática'
    },
    otrosBarrios: { 
      factor: 1.08, 
      descripcion: 'Zona de riesgo moderado (+8%)',
      info: 'Riesgo estándar para la región'
    }
  },
  calcular(datos) {
    const precioBase = this.preciosBase[datos.tipoPropiedad] * datos.metrosCuadrados;
    const factorUbicacion = this.factoresUbicacion[datos.ubicacion].factor;
    const cotizacionBase = precioBase * factorUbicacion;
    const coberturaViento = cotizacionBase * 0.12;
    const coberturaTormenta = cotizacionBase * 0.08;
    return {
      cotizacionBase: Math.round(cotizacionBase),
      coberturaViento: Math.round(coberturaViento),
      coberturaTormenta: Math.round(coberturaTormenta),
      total: Math.round(cotizacionBase + coberturaViento + coberturaTormenta),
      desglose: {
        precioM2: this.preciosBase[datos.tipoPropiedad],
        superficie: datos.metrosCuadrados,
        factorRiesgo: factorUbicacion
      }
    };
  },
  validar(datos) {
    const errores = {};
    if (!datos.nombre || datos.nombre.trim().length < 3) {
      errores.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    if (!datos.metrosCuadrados || datos.metrosCuadrados <= 0) {
      errores.metrosCuadrados = 'Ingresá una superficie válida mayor a 0 m²';
    }
    if (datos.metrosCuadrados > 10000) {
      errores.metrosCuadrados = 'Para propiedades mayores a 10.000 m² consultá directamente';
    }
    return errores;
  }
};

export default function App() {
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

  const infoUbicacion = cotizador.factoresUbicacion[formData.ubicacion];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <nav style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1140px', 
          margin: '0 auto', 
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                Seguros Bahía Tranquila
              </h1>
              <small style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Cotizador de Seguros para el Hogar
              </small>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1rem' }}>
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

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)'
        }}>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              onClick={handleSubmit}
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

          {resultado && !loading && (
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
                  margin: '1rem 0 0 0',
                  fontSize: '0.75rem',
                  color: '#6c757d',
                  textAlign: 'center'
                }}>
                  * Esta cotización es orientativa. Vigencia: 30 días.
                </p>
              </div>
            </div>
          )}
        </div>

        <div style={{
          textAlign: 'center',
          padding: '2rem 0',
          color: '#6c757d',
          fontSize: '0.875rem'
        }}>
          <p style={{ margin: '0 0 0.25rem 0' }}>
            Proyecto Final React - Carrera Front End
          </p>
          <p style={{ margin: 0, fontSize: '0.75rem' }}>
            Bahía Blanca, Buenos Aires
          </p>
        </div>
      </div>
    </div>
  );
}