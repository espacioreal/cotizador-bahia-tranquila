import { Link, useLocation } from 'react-router-dom';
const Header = () => {
  const location = useLocation();

  return (
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
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
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
        </Link>

        {/* Navegación */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent',
              transition: 'background-color 0.2s'
            }}
          >
            🏠 Inicio
          </Link>
          <Link
            to="/historial"
            style={{
              textDecoration: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: location.pathname === '/historial' ? 'rgba(255,255,255,0.1)' : 'transparent',
              transition: 'background-color 0.2s'
            }}
          >
            📋 Historial
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;