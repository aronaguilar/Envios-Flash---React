import { useEffect, useState } from 'react';
import '../estilos/Header.css';
import NavIniciar from '../links/NavIniciar';
import NavRegistrar from '../links/NavRegistrar';
import NavHome from '../links/NavHome';
import Usuario from './Usuario';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Header({titulo}) {

  ////////////// ESTADOS //////////////////////
  const [usuario, setUsuario] = useState(null);
  const [textoBuscado, setTextoBuscado] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");


  /////////// RECUPERA LOS DATOS DEL USUARIO ////////////
  useEffect(() =>{
      const datos = localStorage.getItem("usuario");
      setUsuario(JSON.parse(datos)); // parse convierte el texto en arrays (en localStorage se guarda texto)

    }, []);


  ////////////// FUNCION PARA BUSCAR PRODUCTOS ///////////////

  const buscar = (e) => {

    e.preventDefault(); // CLAVE

    const texto = textoBuscado.trim();

    if (!texto) return;

    const query = encodeURIComponent(texto);
    window.location.href = `/buscar?query=${query}`;

};

// DETECTA LA URL DE LA PAGINA PARA RENDERIZAR EL HEADER ///

    const pagina = useLocation();
    const nombrePagina = pagina.pathname

    
  return(

    <header>

        { nombrePagina != "/" &&  <div className='auxiliar'></div>}

        <h1 className='cont-titulo'>
              <NavHome titulo={titulo}/>
        </h1>

        {

        nombrePagina == "/" &&

        <form className='buscador'>
                <input
                        type="text"
                        placeholder='Buscar...'
                        className='buscador-texto'
                        onChange={evento =>setTextoBuscado(evento.target.value)}
                />
                <button
                      className='buscador-boton'
                      type="button"
                      onClick={buscar}
                >
                        <img src="../public/lupa.png" alt="" className='buscador-boton-img'/>
                </button>
        </form>
        }

       

        <nav className='cont-links'>
              {usuario == null && <NavIniciar/> }  
              {usuario == null && <NavRegistrar/>}
              {usuario != null && <Usuario nombre={usuario.nombre} apellido={usuario.apellido}/>}      
              {usuario != null && <Link  to="/Carrito" className='cont-carrito'><img src="../public/carro.png" alt="" /></Link>}
        </nav>

    </header>

  )

}



export default Header