import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../estilos/PaginaProducto.css";

import Header from '../componentes/Header';
import Footer from '../componentes/Footer';

const PaginaProducto = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation();
  const nombrePagina = location.pathname;

  const [producto, setProducto] = useState(null);
  const [verificador, setVerificador] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const datos = localStorage.getItem("usuario");
    setUsuario(JSON.parse(datos));
    console.log(usuario)
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data));
  }, [id]);

  useEffect(() => {
    if (!producto || !usuario) return;

    const verificarCarrito = async () => {
      const idProducto = producto.id;
      const idUsuario = usuario.id;

      const respuesta = await fetch("http://localhost:8080/carrito/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUsuario, idProducto }),
      });

      const dato = await respuesta.json();
      setVerificador(dato.verificar);
    };

    verificarCarrito();
  }, [producto, usuario]);

  if (!producto) return <p>Cargando...</p>;

  const agregarAlCarrito = async () => {

      if(!usuario){
        navigate(`/Iniciar?query=${nombrePagina}`);
      }
    
      const idProducto = producto.id;
      const idUsuario = usuario.id;

      await fetch("http://localhost:8080/carrito/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUsuario, idProducto }),
      });

      setVerificador(true);

      const data = await respuesta.json();

  };


  const eliminarDeCarrito = async () =>{

        const idUsuario = usuario.id;
        const idProducto = producto.id;

        const respuesta = await fetch("http://localhost:8080/carrito/borrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idUsuario, idProducto }),

        });

        setVerificador(false);

        const data = await respuesta.json();

    }

  const comprarProducto = async () =>{
    if(!usuario){
        navigate(`/Iniciar?query=${nombrePagina}`);
      }
  }

  return (
    <div className='contenedor-caja-producto'>

      <Header usuario={usuario} titulo={"ENVIOS"} />

      <div className='cont-todo'>

        <h2>{producto.nombre}</h2>

        <img src={producto.imagen} alt={producto.nombre} />

        <div className='cont-precio-desc'>
          <p>Precio: ${producto.precio}</p>
          <p>{producto.descripcion}</p>
        </div>

        <div className='cont-botones'>
          {!verificador && (
            <button className='btn-carrito' onClick={agregarAlCarrito}>
              Agregar al carrito
            </button>
          )}

          {verificador && (
            <button className='btn-carrito-eliminar' onClick={eliminarDeCarrito}>
              Eliminar de carrito
            </button>
          )}

          <button className='btn-comprar' onClick={comprarProducto}>Comprar</button>
        </div>

      </div>

      <Footer />

    </div>
  );
};

export default PaginaProducto;