import { useEffect, useState } from 'react';
import iconoUser from '../../../assets/person-circle.svg';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { useLocation } from 'wouter';
import Alert from '../../comun/Alert';

export default function Usuario() {
  const [location, setLocation] = useLocation();
  const [idUsuario, setIdUsuario]=useState()
  const [showAlert, setShowAlert]=useState(false)
  const [alertData, setAlertData]=useState({})

  const [form, setForm] = useState({
    nombre:"",
    apellido:"",
    correo:"",
  });

  // Función modificar Usuario

  function putUsuario() {
    const url = 'http://localhost:3000/api/usuarios';
    const data = {...form}
    const token=sessionStorage.getItem("token")
    const config = {
      params:{
        id:idUsuario
      },
      headers:{
        authorization:token
      }
    };
    
    axios.put(url, data, config)
    .then((resp) => {
      if (resp.data.status=="ok"){
        setAlertData({
          titulo:'Usuario modificado correctamente',
          check:true
        })
        setShowAlert(true)
        getUsuario(idUsuario)
      }
      if(resp.data.error){
        setAlertData({
          titulo:'Error',
          detalle:resp.data.error,
          check:false
        })
        setShowAlert(true)
      }
    })
    .catch((error)=>{
      setAlertData({
        titulo:'Error',
        check:false
      })
      setShowAlert(true)
    })
  }


  // Función obtener Usuario

  function getUsuario(id) {
    const url = 'http://localhost:3000/api/usuarios';
    // const token = sessionStorage.getItem("token");
    const config = {
      params:{
        id
      }
    }
  
    axios.get(url, config)
      .then((resp) => {
        if (resp.data.result){
          setForm({ 
            nombre:resp.data.result.nombre,
            apellido:resp.data.result.apellido,
            correo:resp.data.result.correo,
          });
        }
      }
    )
    
      .catch((error) => {
        console.log(error);
      });
  }

  function cerrarSesionUsuario() { 
    sessionStorage.removeItem("token");  
    setLocation('/login');
  }

  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    if(token!==null){
      const decoded = jwtDecode(token);
      setIdUsuario(decoded.data.id_usuario); 
      getUsuario(decoded.data.id_usuario);

    }else{
      setLocation('/login');
    }

  },[])


  return (
    <div className="flex justify-center items-center mt-20 sm:mt-32 w-full px-4">
      {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
      <form className="py-10 px-5 sm:py-12 sm:px-8 w-full max-w-sm bg-gray-300 rounded-lg shadow-md flex flex-col items-center">
        {/* Icono de Usuario */}
        <div className="flex justify-center mb-10">
          <img src={iconoUser} alt="User Icon" className="w-14 h-14 sm:w-16 sm:h-16" />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-6 w-full mb-10">
          <input
            value={form.nombre}
            type="text"
            placeholder="Nombre..."
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-700"
            onChange={(e) => setForm({...form,nombre:e.target.value})}
          />
          <input
          value={form.apellido}
            type="text"
            placeholder="Apellido..."
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-700"
            onChange={(e) => setForm({...form,apellido:e.target.value})}
          />
          <input
            value={form.correo}
            type="email"
            placeholder="Correo electrónico..."
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-700"
            onChange={(e) => setForm({...form,correo:e.target.value})}
          />
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4 mt-6 w-full">
          <button 
            onClick={()=>putUsuario()}
            type="button" 
            className="w-full sm:w-auto px-6 py-3 text-white bg-orange-500 rounded hover:bg-orange-600 active:bg-orange-700 focus:outline-none">
            Modificar
          </button>
          <button 
            onClick={()=>cerrarSesionUsuario()}
            type="button" 
            className="w-full sm:w-auto px-6 py-3 text-white bg-orange-500 rounded hover:bg-orange-600 active:bg-orange-700 focus:outline-none">
            Cerrar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}
