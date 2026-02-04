import React from 'react'
import {useState, useEffect} from "react"
import "../estilos/ProductoCarrito.css"
import Usuario from './Usuario'


const ProductoCarrito = ({imagen, nombre, precio, idProducto, cantidad ,obtenerCarrito}) => {


    const [usuario, setUsuario] = useState(null)
    
    useEffect(() =>{
      
        const datos = localStorage.getItem("usuario");
      
        setUsuario(JSON.parse(datos)); // parse convierte el texto en arrays (en localStorage se guarda texto)
    }, []);

    

    const eliminarDeCarrito = async () =>{

        const idUsuario = usuario.id
        console.log(idUsuario);
        console.log(idProducto);

        const respuesta = await fetch("http://localhost:8080/carrito/borrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idUsuario, idProducto }),

        });

      const data = await respuesta.json();

      obtenerCarrito()

    }

    const aumentarCarrito = async () =>{
      
      const idUsuario = usuario.id

      const respuesta = await fetch("http://localhost:8080/carrito/aumentar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idUsuario, idProducto}),
        
      });

      const data = await respuesta.json();
      obtenerCarrito()



    }

    const disminuirCarrito = async () =>{
      
      const idUsuario = usuario.id

      const respuesta = await fetch("http://localhost:8080/carrito/disminuir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idUsuario, idProducto}),
        
      });

      const data = await respuesta.json();
      obtenerCarrito()



    }

    

  return (

            <div className='cont-producto-carrito'>
                <img src={imagen} alt="" className='imagen-producto-carrito'/>
                <div className='cont-datos-producto-carrito'>
                    <h3>{nombre}</h3>
                    <h2>${precio}</h2>
                </div>
                
                <div className='cantidad-producto'>
                    <div>{cantidad}</div>
                    <button className="btn-cantidad"onClick={aumentarCarrito}><img src="../public/mas.png" alt="" /></button>
                    <button className="btn-cantidad restar"onClick={disminuirCarrito}><img src="../public/menos.png" alt="" /></button>
                </div>
                
                <button className='boton-eliminar' onClick={eliminarDeCarrito}>ELIMINAR</button>
                
            </div>
  )
}

export default ProductoCarrito