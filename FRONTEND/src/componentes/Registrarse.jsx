import { use, useState } from 'react';

import '../estilos/Registrar.css';

function Registrarse(){

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [gmail, setGmail] = useState("")
    const [contraseña, setContraseña] = useState("")

    const [error, setError] = useState(false)
    const [mensaje, setMensaje] = useState("")

    const handleSubmit = async (evento) => {    
        evento.preventDefault() // ESTA FUNCION EVITA QUE SE RECARGUE LA PAGINA CUANDO SE DA CLICK

        if(nombre === "" || apellido === "" || gmail === "" || contraseña === ""){
            setError(true);
            return
        };
        setError(false);

        try{

            const respuesta = await fetch("http://localhost:8080/registrar", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({nombre,apellido,gmail,contraseña})
            });

            const datos = await respuesta.json();

            if(!respuesta.ok){
                setMensaje(datos.mensaje);
                setError(true);
                return
            };

            alert(datos.mensaje);


            /////////////// GUARDAR DATOS EN LOCAL STORAGE//////////////

            localStorage.setItem("usuario", JSON.stringify({
                id: datos.id,
                nombre: datos.nombre,
                apellido: datos.apellido,
                gmail: datos.gmail
            }));

            window.location.href = "/";
        }

        catch(err){
            setError("ERROR EN EL SERVIDOR");
        }


    }
    return(
        <div>
            <div className='contenedor'>
                <h2 className='titulo'>REGISTRARSE</h2>
                <form 
                    onSubmit={handleSubmit}
                    className='formulario'
                >
                    <input 
                        type="text" 
                        placeholder='Nombre' 
                        id='input_nombre'
                        value={nombre}
                        onChange={a => setNombre(a.target.value)} ///captura lo que escribimos

                        className='input'
                    />
                    <input 
                        type="text" 
                        placeholder='Apellido' 
                        id='input_apellido'
                        value={apellido}
                        onChange={a => setApellido(a.target.value)} ///captura lo que escribimos

                        className='input'
                    />
                    <input 
                        type="text" 
                        placeholder='Gmail' 
                        id='input_gmail'
                        value={gmail}
                        onChange={a => setGmail(a.target.value)}  ///captura lo que escribimos

                        className='input'
                    />
                    <input 
                        type="password" 
                        placeholder='Contraseña' 
                        id='input_contraseña'
                        value={contraseña}
                        onChange={a => setContraseña(a.target.value)}  ///captura lo que escribimos

                        className='input'
                    />
                    <button id='boton_enviar'>REGISTRAR</button>
                </form>
                {error && <p>{mensaje}</p>}

            </div>
        </div>
    )
}

export default Registrarse;