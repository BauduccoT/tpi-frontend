import { useEffect, useState } from 'react'
import "./App.css"
import { Router, Route, Switch, Redirect } from "wouter";
import Navbar from './componentes/comun/Navbar'
import NavbarAdmins from './componentes/admin_components/comunAdmins/NavbarAdmins'
import Login from './componentes/vistasPublic/login/Login'
import Registro from './componentes/vistasPublic/registro/Registro';
import Carrito from './componentes/vistasPublic/carrito/Carrito';
import Usuario from './componentes/vistasPublic/usuario/Usuario'
import Home from './componentes/vistasPublic/home/Home';
import VistaProducto from './componentes/vistasPublic/vistaProducto/VistaProducto';
import CategoriaMenu from './componentes/admin_components/vistasAdmins/CategoriaMenu';
import AdminsMenu from './componentes/admin_components/vistasAdmins/AdminsMenu';





export default function App() {

  const [navbar,setNavbar]=useState(false)
  

  // useEffect(()=>{
  //   sessionStorage.setItem("sesion",true)
  // },[])

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

          <Route path="/usuario">
          <Navbar/>
            <Usuario/>
          </Route>

          <Route path="/admin/categoria">
          
            <CategoriaMenu/>
          </Route>

          <Route path="/admin/admins">
            <NavbarAdmins/> 

            <AdminsMenu/>
          </Route>

          <Route path="/producto/:id">
            <Navbar/>
            <VistaProducto />
          </Route>

         

          <Route children={<span>Page not found 404</span>}/>
        </Switch>

      </Router> 
  
    </div>

  )
}
