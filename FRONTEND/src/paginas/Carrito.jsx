import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductoCarrito from '../componentes/ProductoCarrito'
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'

import "../estilos paginas/Carrito.css"


const Carrito =  ()   => {

  const [productos, setProductos] = useState([])
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const [totalCarrito, setTotalCarrito] = useState(0)

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;



  ///////////RECIBE LOS DATOS DEL USUARIO GUARDADO///////////////////
  useEffect(() =>{
  
      const datos = localStorage.getItem("usuario");
  
      setUsuario(JSON.parse(datos)); // parse convierte el texto en arrays (en localStorage se guarda texto)
    }, []);
    


  //////////////FUNCION PARA OBTENER CARRITO/////////////////////
  const obtenerCarrito =  async () =>{

        try{

            const respuesta =  await fetch(`${API_URL}/carrito/${usuario.id}`);
            const datos = await respuesta.json();
            setProductos(datos);
        }

        catch(err){
          setMensaje("ERROR EN EL SERVIDOR")
        }


      }



  /////// LLAMA LA FUNCION PARA OBTENER CARRITO/////////////////
  useEffect(() => {

      if (!usuario) return;

      obtenerCarrito()

  }, [usuario]);




  /////// CALCULADOR DEL TOTAL DEL CARRITO/////////////////

  useEffect(()=>{
      const total =productos.reduce((acumulador, p) => acumulador + (p.producto.precio * p.cantidad),0);
      setTotalCarrito(total);

  },[productos]);

  


  ///////// LO QUE SE RENDERIZA ///////////////

  return (

    <div className='cont-carrito-pagina'>

            <Header titulo={"ENVIOS"}/> 

            <div className='carrito-total'>
                  <section className='cont-productos-carrito'>
                      
                      {error && <p>{mensaje}</p>}
                      {productos.length == 0 && 
                          <div className='pag-carrito-cont-vacio'>
                            <h3>Aun no haz agregado nada al carrito</h3> 
                            <button onClick={() =>{navigate("/")}}>EXPLORAR</button>
                          </div>
                          
                      }

                      {productos.map(producto => (
                        <ProductoCarrito  

                            key= {producto.producto.id}
                            idProducto= {producto.producto.id}
                            nombre= {producto.producto.nombre}
                            precio= {producto.producto.precio}
                            imagen= {producto.producto.imagen}
                            obtenerCarrito= {obtenerCarrito}
                            cantidad= {producto.cantidad}
                          
                        />
                      ))}
                  </section>

                  <section className='cont-total-carrito'>

                      <h2>Detalle total</h2>

                      {productos.map( producto =>(
                        <p className='item'>{producto.producto.nombre}: ${producto.producto.precio} <div>x{producto.cantidad}</div></p>
                      ))}

                      <div className='separador'></div>

                      <h3>TOTAL : ${totalCarrito}</h3>

                      <button>COMPRAR</button>


                  </section>
            </div>
                 

    </div>
    
  )
}

export default Carrito