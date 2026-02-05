import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import '../estilos/Login.css';

function Login(){

    ///////////////ESTADOS///////////////////////

    const [gmail, setGmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const [queryParams] = useSearchParams();

    const navigate = useNavigate();
    const paginaAnterior = queryParams.get("query") || "";
    console.log(paginaAnterior);

    //////////////NO RECARGAR PAGINA Y CAMPOS VACIOS///////////

    const API_URL = import.meta.env.VITE_API_URL; ////cambiar la url del back si muere esa url

    const handleSubmit = async (evento) => {    
        evento.preventDefault(); // ESTA FUNCION EVITA QUE SE RECARGUE LA PAGINA CUANDO SE DA CLICK

        if(gmail === "" || contraseña === ""){  // SI LOS INPUT ESTAN VACIOS DA ERROR
            setError(true); 
            return
        }
        setError(false); //QUITA EL ERROR SI SE LLENAN LOS INPUT


        try{
            const respuesta = await fetch(`${API_URL}/usuarios`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},      //avisa al back que es un json
                body: JSON.stringify({gmail, contraseña})          //convertimos en json
            });

            const datos = await respuesta.json(); //obtiene la respuesta del back

            if (!respuesta.ok){
                setMensaje(datos.mensaje)
                setError(true)
                return
            }
            
            /////////////// GUARDAR DATOS EN LOCAL STORAGE//////////////

            localStorage.setItem("usuario", JSON.stringify({
                id: datos.id,
                nombre: datos.nombre,
                apellido: datos.apellido,
                gmail: datos.gmail
            }))
            
            if(paginaAnterior){
                navigate(paginaAnterior);
            }
            else{
                navigate("/")
            }
           
        }

        catch(err){
            setError("Error de servidor");
            
        }
    };



    return(
        <>
            <div className='contenedor'>
                <h2 className='titulo'>INICIAR SECIÓN</h2>
                <form 
                    className='formulario'
                    onSubmit={handleSubmit} // llama a la funcion si se da click
                >

                    <input 
                        type="text" 
                        placeholder='Gmail' 
                        id='input_gmail'
                        value={gmail}
                        onChange={evento => setGmail(evento.target.value)}  //captura lo que escribamos en el input
                    />

                    <input 
                        type="password" 
                        placeholder='Contraseña' 
                        id='input_contraseña'
                        value={contraseña}
                        onChange={evento => setContraseña(evento.target.value)}  //captura lo que escribamos en el input
                    />
                    
                    <button id='boton_enviar'>Iniciar sesion</button>
                </form>
                {error && <p>{mensaje}</p>} 
            </div>
        </>
    )
}

export default Login;