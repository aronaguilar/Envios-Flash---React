

import { BrowserRouter as Router} from "react-router-dom"
import {Routes, Route} from "react-router-dom"

import Home from './paginas/Home';
import Iniciar from './paginas/Iniciar';
import Registrar from './paginas/Registrar';
import PaginaProducto from './paginas/PaginaProducto';
import Perfil from './paginas/Perfil';
import Carrito from './paginas/Carrito';
import Buscador from './paginas/Buscador';
import Publicaciones from "./paginas/Publicaciones";
import './estilos/App.css'




function App() {
  return(
    <>
      <div id='contenedor-principal'>
        
            <Router>
                <Routes>
                          <Route path="/" element={<Home/>}/>
                          <Route path="/Iniciar" element={<Iniciar/>}/>
                          <Route path="/Registrarse" element={<Registrar/>}/>
                          <Route path="/Producto/:id" element={<PaginaProducto/>}/>
                          <Route path="/Perfil" element={<Perfil/>}/>
                          <Route path="/Carrito" element={<Carrito/>}/>
                          <Route path="/Buscador" element={<Buscador/>}/>
                          <Route path="/Publicaciones" element={<Publicaciones/>}/>
                </Routes>
            </Router>
      </div>
    </>
  )
}

export default App












































/*
function App() {
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() =>{

    fetch("http://localhost:8080/productos")
      .then(res => res.json())
      .then(data => {
          setProductos(data);
          setCargando(false);
      })

      .catch(err => {
        console.log("Error al obtener los productos", err);
        setCargando(false);
      });

  }, []);
  
    if (cargando) return <p>Cargando productos...</p>;


  return(
    <>
        <div>
          <Header/>
          <section className='seccionProductos'>
              {productos.map(producto => (
                <Producto  key={producto.id} nombre={producto.nombre} precio={producto.precio} imagen={"https://nikearprod.vtexassets.com/arquivos/ids/773886-1200-1200?width=1200&height=1200&aspect=true"}/>
              ))}
          </section>
        </div>
      
      
    </>
  )
}
*/