import React from 'react'
import '../estilos/Usuario.css';

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';




const Usuario = ({nombre, apellido}) => {

    const [menu, setMenu] = useState(false)

    const resetearMenu = () =>{
        setMenu(!menu)
    } 

    const cerrarSecion = () =>{
        localStorage.removeItem("usuario")
        window.location.href = "/"
    }


    return (

        <div>
            <div className={menu ? "cont-usuario activo" : "cont-usuario"} onClick={resetearMenu}>
            
                <img src="../public/gente.png" alt="" className='imagen-usuario' id='imagen-usuario'/>
                <div className='nombre-usuario'>{nombre} {apellido}</div>

            </div>
            {
                menu == true && 
                <div className='desplegado-usuario' >
                    <Link to="/Perfil" className='opcion' id='btn-perfil'>PERFIL</Link>
                    <Link to="/Publicaciones" className='opcion' id='btn-publicaciones'>PUBLICACIONES</Link>
                    <div className='opcion'>OPCION</div>
                    <div className='opcion cerrar' onClick={cerrarSecion} >CERRAR SECION</div>
                </div>

            }
            
        </div>
    )
}

export default Usuario