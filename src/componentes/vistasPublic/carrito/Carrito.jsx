import React, { useState } from 'react';
import Boton from '../../comun/Boton';
import CarritoItem from './Carritoitem';
import Alert from '../../comun/Alert';
import { Link } from "wouter";
import { useEffect } from 'react';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';


export default function Carrito() {
  const [productos,setProductos]=useState([])

  const [showAlert, setShowAlert]=useState(false)
  const [alertData, setAlertData]=useState({})

  function cargarCarrito(){
    let carrito=sessionStorage.getItem("carrito")
    if(carrito!==null){
      setProductos(JSON.parse(carrito))
    }
  }

  function eliminarProd(prodId){
    let listaProd=[...productos]
    for(let i=0;i<listaProd.length;i++){
        if(listaProd[i].id==prodId){
          listaProd.splice(i,1)
          setProductos(listaProd)
          sessionStorage.setItem("carrito", JSON.stringify(listaProd))
          break
        }
    }
  }

  function setUnidCarrito(prodId, unidades){
    let listaProd=[...productos]
    for(let i=0;i<listaProd.length;i++){
        if(listaProd[i].id==prodId){
          listaProd[i].unidades=unidades
          setProductos(listaProd)
          sessionStorage.setItem("carrito", JSON.stringify(listaProd))
          break
        }
    }
  }

  function finalizarCompra(){
    if(sessionStorage.getItem("token")==null){
      setAlertData({
        titulo:'Inicia sesión',
        detalle:<>Para poder relizar una compra debes tener una sesión activa. haz click <Link to='/login'>aquí</Link> para iniciar sesión</>,
        check:false
      })
      setShowAlert(true) 
    }
    else{
      const url="http://localhost:3000/api/ventas"
      const token=sessionStorage.getItem("token")
      const date = new Date();
      const [month, day, year, hour, minutes, seconds] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      ];
      const fecha= `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
      const data={
        productos:productos,
        idUsuario:jwtDecode(token).data.id_usuario,
        fecha
      }
      const config={
        headers:{
          authorization:token
        }
      }
      axios.post(url,data,config)
      .then((resp)=>{
        if(resp.data.status=="ok")
        sessionStorage.removeItem("carrito")
        setProductos([])
      })
      .catch((error)=>{
        console.log(error)
        alert("error")
      })
    }
    
    
  }

  function vaciarCarrito(){
    setProductos([])
    sessionStorage.removeItem("carrito")
  }
  
  useEffect(()=>{
    cargarCarrito()
  },[])

  return (
    <div className="flex flex-col left-0 right-0 mt-14 sm:mt20">
      {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
      {productos.length==0?
        <div className='flex justify-center mt-10'>
          <p className='flex justify-center w-4/6 sm:w-3/6 p-6 items-center text-xl text-center bg-slate-200 rounded-sm'>
            Parece que todavía no tienes productos en tu carrito
          </p>
        </div>
        :
        <>
          <div className="w-5/6 md:w-4/6 mx-auto my-8 divide-y outline outline-1 outline-slate-300 rounded-md p-4">
            {productos.map((prod, index)=>
              <CarritoItem producto={prod} key={prod.id} 
                eliminarProd={(id)=>eliminarProd(id)}
                setUnidCarrito={(prodId, unidades)=>setUnidCarrito(prodId, unidades)}
              />
            )}
          </div>
          <div className="flex justify-evenly m-8">
              <Boton texto="Vaciar Carrito" click={()=>vaciarCarrito()}/>
              <Boton texto="Finalizar compra" click={()=>finalizarCompra()}/> 
          </div>
        </>
      }
    </div>
  );
};


