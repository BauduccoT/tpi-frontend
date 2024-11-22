import React, { useState, useEffect } from 'react';
import AdminsItem from './Adminsitem';
import iconoPersona from '../../../assets/person.svg';
import ModalAdmin from './ModalAdmin';
import Alert from '../../comun/Alert';
import axios from 'axios';
import { useLocation } from 'wouter';
import { jwtDecode } from 'jwt-decode';

export default function AdminsMenu() {
  const [admins, setAdmins] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [location, setLocation]=useLocation()
  const [adminEditar, setAdminEditar]=useState(null)

  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    
    if(token!==null){
      const decoded = jwtDecode(token)
      if(decoded.data.admin==1) setLocation('/admin/productos');
      if(decoded.data.admin==0) setLocation('/home');
    }
    else{
      setLocation('/home');
    }
    buscarAdmins()
  },[])

  function buscarAdmins() {
    const url = 'http://localhost:3000/api/usuarios-admin';
    const token = sessionStorage.getItem('token');
    const config = { headers: { authorization: token } };

    axios.get(url, config)
      .then((resp) => {
        if (resp.data.status === 'error') {
          setAlertData({ titulo: 'Error', detalle: resp.data.error, check: false });
          setShowAlert(true);
        } else {
          setAdmins(resp.data.usuarios);
        }
      })
      .catch((error) => {
        setAlertData({
          titulo: 'Error',
          detalle: error.response ? error.response.data.error : 'Error',
          check: false,
        });
        setShowAlert(true);
      });
  }

  function eliminarAdmin(adminId) {
    const url = `http://localhost:3000/api/usuarios-admin`;
    const token = sessionStorage.getItem('token');
    const config = { params: { id: adminId }, headers: { authorization: token } };

    axios.delete(url, config)
      .then(() => buscarAdmins())
      .catch((error) => console.error(error));
  }

  function crearAdmin(form) {
    const url = 'http://localhost:3000/api/usuarios-admin';
    const token = sessionStorage.getItem('token');
    const config = { headers: { authorization: token } };
    const data = { user: form.user, pass: form.pass };

    axios.post(url, data, config)
      .then((resp) => {
        if (resp.data.status === 'error') {
          setAlertData({ titulo: 'Error', detalle: resp.data.error, check: false });
        } else if(resp.data.status=="ok"){
          setAlertData({ titulo: 'Exito', detalle: 'Administrador creado correctamente', check: true });
          buscarAdmins();
        }
        setShowAlert(true);
      })
      .catch((error) => {
        setAlertData({
          titulo: 'Error',
          detalle: error.response ? error.response.data.error : 'Error',
          check: false,
        });
        setShowAlert(true);
      });
  }

  function modificarAdmin(form) {
    const url = `http://localhost:3000/api/usuarios-admin`;
    const token = sessionStorage.getItem('token');
    const config = {
      params:{
        id:form.id
      },
      headers: { 
        authorization: token 
      } 
    };
    const data = { 
      user: form.user, 
      pass: form.pass 
    };

    axios.put(url, data, config)
      .then((resp) => {
        console.log(resp);
        
        if (resp.data.status === 'error') {
          setAlertData({ titulo: 'Error', detalle: resp.data.error, check: false });
        } else {
          setAlertData({ titulo: 'Éxito', detalle: 'Administrador modificado correctamente', check: true });
          buscarAdmins();
        }
        setShowAlert(true);
      })
      .catch((error) => {
        setAlertData({
          titulo: 'Error',
          detalle: error.response ? error.response.data.error : 'Error',
          check: false,
        });
        setShowAlert(true);
      });
  }

  return (
    <div className="w-screen flex justify-end">
      <div className="flex h-screen w-full bg-gray-300">
        {showAlert && <Alert data={alertData} click={(value) => setShowAlert(value)} />}
        {isModalOpen && (
          <ModalAdmin
            crear={(form)=>crearAdmin(form)}
            modificar={(form)=>modificarAdmin(form)}
            admin={adminEditar}
            cerrar={() => {
              setIsModalOpen(false);
              setAdminEditar(null);
            }}

          />
        )}

        <div className="flex-1 bg-white">
          <div className="flex items-center mt-14 bg-cyan-700 p-4 mb-6 justify-center w-full">
            <button
              className="p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Agregar
            </button>
          </div>

          <div className="space-y-4 p-6 flex flex-col items-center">
            {admins.map((admin) => (
              <AdminsItem
                key={admin.id}
                admin={admin}
                deleteAdmin={eliminarAdmin}
                modificar={(admin) => {
                  setAdminEditar(admin)
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>        
      </div>
    </div>
  );
}

