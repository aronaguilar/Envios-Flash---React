import React from 'react'
import { Link } from 'react-router-dom'

const links = [
    { name: "Producto", href:"/Producto"}
]

const NavProducto = () => {
  return (
    <div>
        {links.map(x => ( <Link key={x.href} to={x.href}> {x.name} </Link> ))}
    </div>
  )
}

export default NavProducto