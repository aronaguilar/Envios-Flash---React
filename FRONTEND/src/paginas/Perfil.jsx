import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import React from 'react'
import Header from '../componentes/Header'

import '../estilos/Perfil.css';




const Perfil = () => {

    const [usuario, setUsuario] = useState(null);

    const [producto, setProducto] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripción, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [color, setColor] = useState("");
    const [marca, setMarca] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate();


    useEffect(() =>{

        const datosUsuario = localStorage.getItem("usuario");
        setUsuario(JSON.parse(datosUsuario));

    },[]);

    const handleSubmit = async (evento) =>{

        let idUsuario = usuario.id

        evento.preventDefault(); //EVITA QUE SE RECARGAR LA PAGINA

        if(producto === "" || precio === "" || descripción === "" || tipo === "" || color === "" || marca === ""){  //INPUT VACIOS DA ERROR
            setMensaje("DEBES LLENAR TODOS LOS CAMPOS")
            setError(true); 
            return
        }
        setError(false); //QUITA EL ERROR SI SE LLENAN LOS INPUT

        try{

            const respuesta = await fetch("http://localhost:8080/subir",{
                method: "POST",
                headers: {"Content-Type": "application/json"},      //avisa al back que es un json
                body: JSON.stringify({producto, precio, descripción, tipo, color, marca, idUsuario })          //convertimos en json
            });

            const datos = await respuesta.json(); //obtiene la respuesta del back

            if (!respuesta.ok){
                setMensaje(datos.mensaje)
                setError(true)
                return
            }

            navigate(`/Publicaciones`)



        }
        
        catch(err){
            setError("Error de servidor");
        }

    }

    const manejarTipo = (e) =>{
        setTipo(e.target.value);
    }
    const manejarColor = (e) =>{
        setColor(e.target.value);
    }
    const manejarMarca = (e) =>{
        setMarca(e.target.value);
    }

    if (!usuario) {
    return <p>Cargando perfil...</p>;
    }
    
    return (

            <div className='cont-pag-perfil'>

                <Header titulo={"ENVIOS"} usuario={usuario}/>


            
                <div className='cont-perfil-cont-datos'>
                        <img src="../public/gente.png" alt="foto de perfil"  className='cont-imagen'/>
                        <div>
                            <div className='cont-nombre'>{usuario.nombre.toUpperCase()} {usuario.apellido.toUpperCase()}</div>
                            <div className='cont-gmail'>{usuario.gmail}</div>
                        </div>
                </div>

                <div className="cont-acciones">

                    {/* SUBIR PRODUCTO */}
                    <form 
                        className="card-subida"
                        onSubmit={handleSubmit}

                    >

                    <h3 className="titulo-accion">Subir nuevo producto</h3>

                    <div className='cont-todo-opciones'>
                        <div className='perfil-cont-opciones'>
                            <input 
                                type="text" 
                                placeholder="Nombre del producto" 
                                id="input-producto"
                                value={producto}
                                onChange={e => setProducto(e.target.value)}
                            /> 

                            <input 
                                    type="number" 
                                    placeholder="Precio" 
                                    id='input-precio'
                                    value={precio}
                                    onChange={e => setPrecio(e.target.value)}
                            />
                            <textarea 
                                    placeholder="Descripción del producto"
                                    id='input-descripcion'
                                    value={descripción}
                                    onChange={e => setDescripcion(e.target.value)}
                            >

                            </textarea>
                        </div>

                        <div>
                            <select className="selector-opciones" value={tipo} onChange={manejarTipo}>
                                <option value="">Selecciona un tipo</option>
                                <option value="zapatilla">Zapatilla</option>
                                <option value="remera">Remera</option>
                                <option value="gorra">Gorra</option>
                            </select>

                            <select className="selector-opciones" value={color} onChange={manejarColor}>
                                <option value="">Selecciona un color</option>
                                <option value="negro">Negro</option>
                                <option value="blanco">Blanco</option>
                                <option value="verde">Verde</option>
                                <option value="azul">Azul</option>
                                <option value="amarillo">Amarillo</option>
                                <option value="celeste">Celeste</option>
                                <option value="gris">Gris</option>
                            </select>

                            <select className="selector-opciones" value={marca} onChange={manejarMarca}>
                                <option value="">Selecciona una marca</option>
                                <option value="nike">Nike</option>
                                <option value="adidas">Adidas</option>
                                <option value="puma">Puma</option>
                                <option value="dc">DC</option>
                                <option value="montange">Montange</option>
                            </select>
                        </div>
                    </div>
                        {error && <p className='error'>{mensaje}!</p>}

                        <button className="btn-primario">Publicar producto</button>

                    </form>

                </div>
                
            </div>
    )
}

export default Perfil