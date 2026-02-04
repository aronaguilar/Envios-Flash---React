import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../estilos/Header.css';
import NavIniciar from '../links/NavIniciar';
import NavRegistrar from '../links/NavRegistrar';
import NavHome from '../links/NavHome';
import Usuario from './Usuario';

function Header({ titulo }) {

  ////////////// ESTADOS //////////////////////
  const [usuario, setUsuario] = useState(null);
  const [textoBuscado, setTextoBuscado] = useState("");
  

  // DETECTA LA URL DE LA PAGINA PARA RENDERIZAR EL HEADER ///
  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegar sin recargar
  const nombrePagina = location.pathname;


  /////////// RECUPERA LOS DATOS DEL USUARIO ////////////
  useEffect(() => {
    const datos = localStorage.getItem("usuario");
    if (datos) {
      setUsuario(JSON.parse(datos));
    }
  }, []);


  ////////////// FUNCION PARA BUSCAR PRODUCTOS ///////////////
  const buscar = (e) => {

    e.preventDefault();
    const texto = textoBuscado.trim();
    if (!texto) return;

    const query = encodeURIComponent(texto);
    // Cambiamos window.location por navigate
    navigate(`/Buscador?query=${query}`);
  };

  return (
    <header>

      {(nombrePagina !== "/" && nombrePagina !== "/Buscador") && <div className='auxiliar'></div>}

      <h1 className='cont-titulo'>
          <NavHome titulo={titulo} />
      </h1>

      {
        (nombrePagina === "/" || nombrePagina === "/Buscador") && 

        (

          <form className='buscador' onSubmit={buscar}>

              <input
                  type="text"
                  placeholder='Buscar...'
                  className='buscador-texto'
                  value={textoBuscado} // Input controlado
                  onChange={evento => setTextoBuscado(evento.target.value)}
              />
              <button type="submit" className='buscador-boton'>
                  <img src="/lupa.png" alt="Buscar" className='buscador-boton-img' />
              </button>
          </form>

       )
      }

      <nav className='cont-links'>
              {usuario == null && <NavIniciar/> }  
              {usuario == null && <NavRegistrar/>}
              {usuario != null && <Usuario nombre={usuario.nombre} apellido={usuario.apellido}/>}      
              {usuario != null && <Link  to="/Carrito" className='cont-carrito'><img src="../public/carro.png" alt="" /></Link>}
      </nav>

    </header>
  );
}

export default Header;