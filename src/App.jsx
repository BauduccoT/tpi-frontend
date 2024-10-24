import { useState } from 'react'
import "./App.css"
import { Router, Route, Switch, Redirect } from "wouter";
import Navbar from './componentes/comun/Navbar'

import Home from './componentes/public_components/home/Home';
import VistaProducto from './componentes/public_components/vistaProducto/VistaProducto';



export default function App() {

  const [navbar,setNavbar]=useState(false)

  return (
    <div className='min-h-screen'>
      <Navbar/>
      <Router>     
        
        <Switch>
          
          <Route path="/">
            <Redirect to='home'/>
          </Route>

          <Route path="/home">
            <Home/>
          </Route>

          

          <Route path="/producto">
            <VistaProducto/>
          </Route>


          <Route children={<span>Page not found 404</span>}/>
        </Switch>
        
        
      </Router>
    </div>
  )
}
