import { useState } from 'react'
import "./App.css"
import { Router, Route, Switch, Redirect } from "wouter";
import Navbar from './componentes/comun/Navbar'
import Home from './componentes/Home/Home'


export default function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/">
            <Redirect to="/home"/>
          </Route>
          
          <Route path="/login">
            <Redirect to="/home"/>
          </Route>

          <Route path="/home">
            <Home/>
          </Route>

          <Route path="/carrito">
            <Home/>
          </Route>


          <Route children={<span>Page not found 404</span>}/>
        </Switch>
      </Router>
      
      
    </>
  )
}
