import { useState } from 'react'
import "./App.css"
import { Router, Route, Switch, Redirect } from "wouter";
import Navbar from './componentes/comun/Navbar'
import Login from './componentes/login/Login'
import Registro from './componentes/registro/Registro';
import Carrito from './componentes/carrito/Carrito';
import Home from './componentes/public_components/home/Home';
import VistaProducto from './componentes/public_components/vistaProducto/VistaProducto';




export default function App() {

  const [navbar,setNavbar]=useState(false)

  return (
    <div className='min-h-screen'>
      
      <Router>     
        
        <Switch>
          
          <Route path="/">
            <Redirect to='login'/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/registro">
            <Registro/>
          </Route>   
        
          <Route path="/home">
            <Navbar/>
            <Home/>
          </Route>

          <Route path="/carrito">
            <Navbar/>
            <Carrito/>
          </Route>

          <Route path="/producto">
            <Navbar/>
            <VistaProducto/>
          </Route>

         

          <Route children={<span>Page not found 404</span>}/>
        </Switch>

      </Router> 
  
    </div>

  )
}
