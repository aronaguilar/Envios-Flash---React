import React from 'react' ;
import {useState} from "react";
import '../estilos/Carrousel.css'

const Carrousel = ({imagenes}) => {

    const [index, setIndex] = useState(0);

    const next = () =>{
        setIndex((prev) => (prev + 1) % imagenes.length);
    }

    const prev = () =>{
        setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    }

    return (
        <div className='carrousel'>
            <div 
                className='cont-imagenes' 
                style={{transform: `translateX(-${index * 100}%)`}}
            >
                    {imagenes.map((src, i) =>(
                        <img key={i} src={src} className='imagen-carrousel'/>
                    ))}

            </div>
            <button className='boton anterior' onClick={prev}>◀</button>
            <button className='boton siguiente' onClick={next}>▶</button>
        </div>
    )
}

export default Carrousel