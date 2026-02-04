import React from 'react'
import Login from '../componentes/Login'
import Header from '../componentes/Header' 
import Footer from '../componentes/Footer' 


const Iniciar = () => {
  return (
    <div className='cont-pag'>
        <Header titulo={"ENVIOS"}/>
        <Login/>
        <Footer/>
    </div>
  )
}

export default Iniciar