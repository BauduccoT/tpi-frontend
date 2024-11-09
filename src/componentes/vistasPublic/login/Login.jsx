import { useState } from 'react';
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
          token.data.admin==1 ? setLocation('/admin/productos') :  setLocation('/home')
        }
      })
      .catch((error)=>{
        console.log(error);
        
        setAlertData({
            titulo:'Error',
            detalle:error.error,
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

  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
    
      <form className="flex flex-col bg-purple-900 p-20 rounded-lg shadow-md w-100 items-center">
        
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
        <Link to='/registro'><p className='text-white text-decoration-line: underline'>Haga Click Aquí par Registrarse</p></Link>
      
        <br></br>
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
