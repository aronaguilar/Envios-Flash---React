import React from 'react'
import { useEffect, useState } from 'react';

import Header from '../componentes/Header'
import Producto from '../componentes/Producto'
import Carrousel from '../componentes/Carrousel';
import Footer from '../componentes/Footer';
import Usuario from '../componentes/Usuario';

const imagenes = [
    "../public/zapas.jpg",
    "../public/zapas.jpg",
    "../public/zapas.jpg",
  ];




const Home = () => {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [usuario, setUsuario] = useState(null);

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

  useEffect(() =>{

    const datos = localStorage.getItem("usuario");

    setUsuario(JSON.parse(datos)); // parse convierte el texto en arrays (en localStorage se guarda texto)
  }, []);
  
  
  const ordenarProductos = (e) => {  // EL e VIENE DEL ONCHANGE DONDE NOS DA LAS OPCIONES
  const opcion = e.target.value; 

  let ordenados = [...productos];

  if (opcion === "1") {
    // menor a mayor
    ordenados.sort((a, b) => a.precio - b.precio);
  } 
  else if (opcion === "2") {
    // mayor a menor
    ordenados.sort((a, b) => b.precio - a.precio);
  }

  setProductos(ordenados);
  };

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <div className='cont-home'>
        
        <Header titulo={"ENVIOS"}/>
        <Carrousel imagenes={imagenes}/>

      
          <div className='cont-ordenar'>
            <div className='ordenar'>Ordenar de</div>
            <select name="opciones" id="opciones" onChange={ordenarProductos} className='opciones'> /* EL ONCHANGE GENERA EL EVENTE CON LOS VALUES */
                <option value="1">MENOR A MAYOR</option>
                <option value="2">MAYOR A MENOS</option>
                
            </select>
          </div>
        
        <section className='seccionProductos'>
          
              {productos.map(producto => (
                <Producto  key={producto.id} id={producto.id} nombre={producto.nombre} precio={producto.precio} imagen={producto.imagen}/>
              ))}
        </section>
        <Footer/>
    </div>
  )
}

export default Home


