import { useState } from 'react'
import "./App.css"
import { Router, Route, Switch, Redirect } from "wouter";
import Navbar from './componentes/comun/Navbar'
import Home from './componentes/Home/Home'
import Login from './componentes/login/Login'
import Registro from './componentes/registro/Registro';
import Carrito from './componentes/carrito/Carrito';


export default function App() {

  return (
    <>
    {/* <Router>
    <Route path="/">
            <Redirect to="/login"/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/registro">
            <Registro/>
          </Route>
    </Router>     

     <Router>
      <Navbar/>
        <Switch>
        
          <Route path="/home">
            <Home/>
          </Route>

          <Route path="/carrito">
            <Carrito/>
          </Route>

          <Route children={<span>Page not found 404</span>}/>
        </Switch>
      </Router> */}
     
    </>
  )
}
