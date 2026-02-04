import '../estilos/Producto.css'
import { Link } from 'react-router-dom'

function SeccionProductos({id,imagen,nombre,precio}) {

  return(
    
        <Link to={`/Producto/${id}`} className='cont-producto'>
            <img src={imagen} alt="" className='producto-imagen'/>
            <div className='cont-datos-producto'>
                <h3>{nombre}</h3>
                <h2>${precio}</h2>
            </div>
        </Link>
        
        
    
  )
}

export default SeccionProductos

