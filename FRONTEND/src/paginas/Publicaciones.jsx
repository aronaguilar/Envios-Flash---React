import React from 'react'
import { useState, useEffect } from "react";

import Header from '../componentes/Header';
import ProductoPublicaciones from '../componentes/ProductoPublicaciones';

import "../estilos paginas/Publicaciones.css"

const Publicaciones = () => {

    const [productos, setProductos] = useState([]);
    const [usuario, setUsuario] = useState(null)
    const API_URL = import.meta.env.VITE_API_URL;

    ///////////RECIBE LOS DATOS DEL USUARIO GUARDADO///////////////////
    useEffect(() =>{
      
        const datos = localStorage.getItem("usuario");
      
        setUsuario(JSON.parse(datos)); // parse convierte el texto en arrays (en localStorage se guarda texto)
    }, []);
    

    const obtenerPublicaciones = async () =>{

        try{
            const respuesta = await fetch(`${API_URL}/publicaciones/${usuario.id}`);
            const datos = await respuesta.json();
            console.log(datos);
            setProductos(datos.reverse());
            
            
        }
        catch(err){

        }

    };

    useEffect(() =>{
        if (!usuario) return;

        obtenerPublicaciones()
    },[usuario]);



  return (

        <div className='cont-pag-publicaciones'>
            <Header titulo={"ENVIOS"}/>

            <h3 className='pag-publicaciones-titulo'>Tus publicaciones</h3>
            <div className='pag-publicaciones-separador'></div>
            <section className='cont-productos-publicaciones'>
                      

                      {productos.map(producto => (
                        <ProductoPublicaciones  

                            key= {producto.id}
                            idProducto= {producto.id}
                            nombre= {producto.nombre}
                            precio= {producto.precio}
                            obtenerPublicaciones={obtenerPublicaciones}
                            imagen= {producto.imagen}
                            
                        />
                      ))}
                  </section>

        </div>
  )
}

export default Publicaciones