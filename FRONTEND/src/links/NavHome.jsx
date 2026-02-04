import React from 'react'
import { Link } from 'react-router-dom'

const link = {name:"Home", href:"/"};


const NavHome = ({titulo}) => {
  return (
    <div>
        <Link key={link.href} to={link.href} >{titulo}</Link>
    </div>
  )
}

export default NavHome