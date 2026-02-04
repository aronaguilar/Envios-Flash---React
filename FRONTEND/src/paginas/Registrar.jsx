import React from 'react'
import Header from '../componentes/Header'
import Registrarse from '../componentes/Registrarse'
import Footer from "../componentes/Footer"

const Registrar = () => {
  return (
    <div className='cont-pag'>
        <Header titulo={"ENVIOS"}/>
        <Registrarse/>
        <Footer/>


    </div>
  )
}

export default Registrar