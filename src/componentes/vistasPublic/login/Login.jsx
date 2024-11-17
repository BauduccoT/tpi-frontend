import { useEffect, useState } from 'react';
import { Link, useLocation } from "wouter";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Boton from '../../comun/Boton';
import eye from '../../../assets/eye.svg'
import eyeSlash from '../../../assets/eye-slash.svg'
import iconoCarrito from '../../../assets/cart.svg'
import Alert from '../../comun/Alert';

export default function Login() {
  const [showPass, setShowPass]=useState(false)

  const [showAlert, setShowAlert]=useState(false)
  const [alertData, setAlertData]=useState({})

  const [form, setForm] = useState({
    user:"",
    pass:""
  });

  const [location, setLocation] = useLocation('')

  function login(){
    
    const url="http://localhost:3000/api/usuarios/login"
    const data={
      user:form.user,
      pass:form.pass
    }
    if(data.user!==''&&data.pass!==''){
      axios.post(url,data)
      .then((resp)=>{
        if(resp.data.token){
          sessionStorage.setItem("token",resp.data.token)
          const token=jwtDecode(resp.data.token)
          if(token.data.admin===1){
            setLocation('/admin/productos')
          }
          else{
           setLocation('/home')
          }
        }
        else{
          console.log(resp)
          setAlertData({
            titulo:'Error',
            detalle:resp.data.error,
            check:false
          })
          setShowAlert(true)
        }
      })
      .catch((error)=>{
        console.log(error);
        
        setAlertData({
            titulo:'Error',
            detalle:error.response.data.error,
            check:false
        })
        setShowAlert(true)        
      })
    }
    else{
      setAlertData({
        titulo:'Falta completar campos',
        check:false
      })
      setShowAlert(true)   
    }
  }

  // useEffect(()=>{
  //   const token=sessionStorage.getItem("token")
  //   if(token!==null && token.data?.admin>0 ) setLocation("/admin/productos")
  //   else if(token!==null)setLocation("/home")
  // })

  return (
    <div className="flex justify-center items-center h-screen bg-purple-900 sm:bg-white">
      {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
    
      <form className="flex flex-col bg-purple-900 p-20 rounded-lg sm:shadow-md items-center">
        
        <div className='flex flex-row mb-10'>
          <p className='text-white text-center font-arial text-2xl '>Mercadito</p>
          <img src={iconoCarrito}/>
        </div>

        <div className="mb-8  w-full hover:p-25">
          <input
            type="text"
            placeholder="User..."
            className="w-full p-3 rounded"
            onChange={(e) => setForm({...form,user:e.target.value})}
          />
        </div>

        <div className='mb-8 flex flex-row w-full bg-white rounded'>
          <input 
          type={showPass==true ?'text': 'password'}
          placeholder='Password...' 
          className="w-full p-2 rounded focus:outline-0"
          onChange={(e)=>setForm({...form,pass:e.target.value})} />
          <div className='flex justify-center align-middle p-3 cursor-pointer' onClick={()=> setShowPass(!showPass)}>
              {showPass==true ? <><img className='h-5' src={eye}/></> : <><img className='h-5' src={eyeSlash}/></>}

          </div>
        </div>
        <Link to='/registro'><p className='text-white text-decoration-line: underline'>Haga click aquí para registrarse</p></Link>
        <p className='flex justify-center text-white'>o</p>
        <Link to='/home' className="mb-3"><p className='text-white text-decoration-line: underline'>Continuar sin iniciar sesion</p></Link>
        <div className="flex justify-center">
          <Boton texto='Inicio Sesión' click={(e)=>{
            e.preventDefault()
            login()
          }}/>
        </div>
      </form>
    </div>
  );
}
