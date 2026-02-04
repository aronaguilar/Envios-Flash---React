import React from 'react'
import Header from '../componentes/Header'
import Producto from '../componentes/Producto'

import "../estilos paginas/Buscador.css"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Buscador = () => {

  const [usuario, setUsuario] = useState()
  const [queryParams] = useSearchParams(); //contiene el valor de los parametros pasados

  const [resultados, setResultados] = useState([]); // guardamos el valor buscado
  const [cargando, setCargando] = useState(false); 
  
  const textoBuscado = queryParams.get("query") || "";
  const parametros = textoBuscado.split(" ").filter(p => p !== "");
  console.log(textoBuscado)

  const ralizarBusqueda = async () =>{

        const respuesta = await fetch("http://localhost:8080/buscador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({parametros}),

        });

        if (!respuesta.ok) {
          // Si el servidor responde 500, entra aquí
          throw new Error(`Error en el servidor: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        setResultados(data.productosOrdenados || []);

    }

   useEffect(() => {
    const datos = localStorage.getItem("usuario");
    if (datos) {
      setUsuario(JSON.parse(datos));
    }
  }, []);

  useEffect(() => {
    ralizarBusqueda();
  }, [textoBuscado]);

  console.log(resultados)


  return (
    <div className='cont-buscador-pagina'>
      <Header titulo={"ENVIOS"}/>

      <h3 className='buscador-titulo'>Resultados de busqueda para "{textoBuscado}"</h3>
      <section className='cont-buscador-contenedor'>

        {resultados.map(producto => (
                <Producto  key={producto.id} id={producto.id} nombre={producto.nombre} precio={producto.precio} imagen={producto.imagen}/>
              ))}

        {resultados.length == 0 && <div className='no-resultados'>no se encontró ninguna coincidencias..</div>}
      </section>
    </div>
  )
}

export default Buscador