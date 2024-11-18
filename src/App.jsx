import { useEffect, useState } from 'react'
import "./App.css"
import { Router, Route, Switch, Redirect, useLocation } from "wouter";
import Navbar from './componentes/comun/Navbar'
import NavbarAdmins from './componentes/comunAdmins/NavbarAdmins'
import Login from './componentes/vistasPublic/login/Login'
import Registro from './componentes/vistasPublic/registro/Registro';
import Carrito from './componentes/vistasPublic/carrito/Carrito';
import Usuario from './componentes/vistasPublic/usuario/Usuario'
import Home from './componentes/vistasPublic/home/Home';
import Busqueda from './componentes/vistasPublic/busqueda/Busqueda';
import VistaProducto from './componentes/vistasPublic/vistaProducto/VistaProducto';
import CategoriaMenu from './componentes/vistasAdmins/categoriaMenu/CategoriaMenu';
import AdminsMenu from './componentes/vistasAdmins/adminsMenu/AdminsMenu';
import ProductosMenu from './componentes/vistasAdmins/productosMenu/ProductosMenu';
import { jwtDecode } from 'jwt-decode';

export default function App() {

  const [token,setToken]=useState(null)

  useEffect(()=>{
    let newToken=sessionStorage.getItem("token")
    if(newToken==null) return setToken(false)
    newToken= jwtDecode(newToken)
    setToken(newToken)
  },[])

  return (
    <div className=''>
      
      <Router>     
        
        <Switch>
          
          <Route path="/">
            <Redirect to='/login'/>
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

          <Route path="/busqueda/:nombreProducto">
            <Navbar/>
            <Busqueda/>
          </Route>

          <Route path="/busqueda">
            <Navbar/>
            <div className='flex justify-center h-24 p-20 left-0 right-0 mt-14 sm:mt-20'>
              <p className='text-xl text-slate-600'>
                Por favor, ingrese un producto
              </p>
            </div>
          </Route>

          <Route path="/producto/:id">
            <Navbar/>
            <VistaProducto />
          </Route>

          <Route path="/carrito">
            <Navbar/>
            <Carrito/>
          </Route>

          <Route path="/usuario">
            <Navbar/>
            {token !== null?<Usuario/>:<Redirect to='login'/>}
          </Route>

          <Route path="/admin/categorias">
            <NavbarAdmins/>
            {token !== null && token.data?.admin && token.data?.admin >=1 ? <CategoriaMenu/> : <Redirect to='/login'/> }
          </Route>

          <Route path="/admin/productos">
            <NavbarAdmins/>
            {token !== null && token.data?.admin && token.data?.admin>=1?<ProductosMenu/>:<Redirect to='/login'/>}
          </Route>

          <Route path="/admin/admins">
            <NavbarAdmins/>
            {token !== null && token.data?.admin && token.data?.admin==2?<AdminsMenu/>:<Redirect to='/admin/productos'/>}
          </Route>

          

          <Route>
            <Navbar/>
            <div className='flex justify-center h-24 p-20 left-0 right-0 mt-14 sm:mt-20'>
              <p className='text-xl text-slate-600'>
                Page not found 404
              </p>
            </div>
          </Route>
        </Switch>

      </Router> 
  
    </div>

  )
}
