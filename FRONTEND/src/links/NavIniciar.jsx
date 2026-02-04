import React from 'react';
import { Link } from 'react-router-dom';

/////////DECLARAMOS UN ARRAY DE LINKS////////////
const links = [ 
    { name: "Iniciar", href: "/Iniciar", }, 

]; 
// ////////////FUNCION QUE RETORNA LOS LINKS//////////////// 

const NavIniciar = () => {

     return ( 
                <div>
                     {links.map(x => ( <Link key={x.href} to={x.href}> {x.name} </Link> ))} 
                </div> 
)} 
 
 
 
 
 export default NavIniciar

