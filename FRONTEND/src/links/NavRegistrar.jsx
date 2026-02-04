import React from 'react'
import { Link } from 'react-router-dom';

const links = [
    { name: "Registrarse", href:"/Registrarse"}
]


const NavRegistrar = () => {
  return (
    <div>
        {links.map(x =>(<Link key={x.href} to={x.href}> {x.name} </Link>))}
    </div>
  )
}

export default NavRegistrar