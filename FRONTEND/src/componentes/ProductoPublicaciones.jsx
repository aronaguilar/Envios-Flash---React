import React from 'react'
import {useState, useEffect} from "react";

import "../estilos/ProductoPublicaciones.css"

const ProductoPublicaciones = ({imagen, nombre, precio, idProducto ,obtenerPublicaciones}) => {

    const [usuario, setUsuario] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    ///////////RECIBE LOS DATOS DEL USUARIO GUARDADO///////////////////
    useEffect(() =>{
            
        const datos = localStorage.getItem("usuario");
        setUsuario(JSON.parse(datos)); // parse convierte el texto en arrays (en localStorage se guarda texto)
        
    }, []);


    const eliminarPublicacion = async ()=>{

        const idUsuario = usuario.id
        console.log(idUsuario);
        console.log(idProducto);

        const respuesta = await fetch(`${API_URL}/publicaciones/borrar/${idUsuario}/${idProducto}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        });

      const data = await respuesta.json();

      obtenerPublicaciones()
    
    }


    return (

            <div className='cont-producto-publicaciones'>
                    <img src={imagen} alt="" className='imagen-producto-publicaciones'/>
                    <div className='cont-datos-producto-publicaciones'>
                        <h3>{nombre}</h3>
                        <h2>${precio}</h2>
                    </div>
                    
                    <button className='boton-eliminar-publicaciones'onClick={eliminarPublicacion}>Eliminar Publicacion</button>
                    
            </div>
    )
}

export default ProductoPublicaciones