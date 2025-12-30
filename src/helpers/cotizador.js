const cotizador = {
  // Precios base por m² según tipo de propiedad
  preciosBase: {
    casa: 150,
    departamento: 120,
    comercio: 200,
    oficina: 180
  },

  // Factor de riesgo por ubicación - Basado en eventos climáticos de Bahía Blanca
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

  // Método principal de cálculo
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

  // Validaciones del formulario
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

export default cotizador;