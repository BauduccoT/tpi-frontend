import { Component, useState, useEffect } from 'react'
import Boton from '../../comun/Boton'
import Alert from '../../comun/Alert'
import { Link, useLocation } from 'wouter';
import iconoCarrito from '../../../assets/cart.svg'
import eye from '../../../assets/eye.svg'
import eyeSlash from '../../../assets/eye-slash.svg'
import axios from "axios";

export default function Registro (props){
    const [showAlert, setShowAlert]=useState(false)
    const [alertData, setAlertData]=useState({})
    const [showPass, setShowPass]=useState(false)

    const [form, setForm]=useState({        
        user:"",
        pass:"",
        nombre:"",
        apellido:"",
        correo:""
    });
    const [location,setLocation]=useLocation("")

    function newUser(){
        
        const url="http://localhost:3000/api/usuarios"
        const data={
            user:form.user,
            pass:form.pass,
            nombre:form.nombre,
            apellido:form.apellido,
            correo:form.correo
        }
        if(data.user!==''&&data.pass!==''&&data.nombre!==''&&data.apellido!==''&data.correo!==''){
            axios.post(url,data)
            .then((resp)=>{
                if(resp.data.status=='ok'){
                    setAlertData({
                        titulo:'Usuario creado correctamente',
                        check:true
                    })
                    setShowAlert(true)
                }
                
            })
            .catch((error)=>{
                console.log(error);
                
                setAlertData({
                    titulo:'Error',
                    check:false
                })
                setShowAlert(true)
            })
        }
        else {
            setAlertData({
                titulo:'Falta completar campos',
                check:false
            })
            setShowAlert(true)
        }
        

      }

     return(
        <div className='flex justify-center items-center min-h-screen w-screen'>
            {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
        <form className='flex flex-col bg-purple-900 p-10 sm:p-14 sm:w-3/5 md:w-2/4 lg:w-1/3 py-10 gap-6 rounded-lg shadow-md w-100 items-center'>
            
            <div className='flex flex-row'>
                <p className='text-white text-center font-arial text-2xl '>Mercadito</p>
                <img src={iconoCarrito}/>
            </div>
            
            <input 
            type="text"
            placeholder='Nombre...'
            className="w-full p-2 rounded focus:outline-0" 
            onChange={(e)=>setForm({...form,nombre:e.target.value})} />
            
            
            <input 
            type="text"
            placeholder='Apellido...'
            className="w-full p-2 rounded focus:outline-0" 
            onChange={(e)=>setForm({...form,apellido:e.target.value})} />
            
            
            <input 
            type="text" 
            placeholder='User...'
            className="w-full p-2 rounded focus:outline-0" 
            onChange={(e)=>setForm({...form,user:e.target.value})} />
            
            
            <div className='flex flex-row w-full bg-white rounded'>
                <input 
                type={showPass==true ?'text': 'password'}
                placeholder='Password...' 
                className="w-full p-2 rounded focus:outline-0"
                onChange={(e)=>setForm({...form,pass:e.target.value})} />
                <div className='flex justify-center align-middle p-3 cursor-pointer' onClick={()=> setShowPass(!showPass)}>
                    {showPass==true ? <><img className='h-5' src={eye}/></> : <><img className='h-5' src={eyeSlash}/></>}

                </div>
            </div>
            
            
            <input 
            type="text" 
            placeholder='Correo...' 
            className="w-full p-2 rounded focus:outline-0"
            onChange={(e)=>setForm({...form,correo:e.target.value})} />
            
            <Link to='/login'><p className='text-white text-decoration-line: underline'>Haga Click Aquí para Iniciar Sesión</p></Link>
            
            
            <button 
            onClick={(e)=>{
                e.preventDefault()
                newUser()
            }}
            className="bg-orange-500 text-white p-3 sm:py-1 sm:px:2 md:py-3 md:px-4 rounded-md text-md hover:bg-orange-600" >
                Registro
            </button>
            
            
        </form>


       
        </div>
    )
  }

   
