import React, { useState, useEffect } from 'react';
// import NavbarAdmins from '../comunAdmins/NavbarAdmins';
import AdminsItem from '../../comunAdmins/Adminsitem';
import iconoPersona from '../../../assets/person.svg';
import ModalAdmin from '../../comunAdmins/ModalAdmin';
import Alert from '../../comun/Alert';
import axios from 'axios';
import ModalConfirmar from '../../comunAdmins/ModalConfirmar';


export default function AdminsMenu() {
  const [admins, setAdmins] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function buscarAdmins() {
    const url = 'http://localhost:3000/api/usuarios-admin';
    const token = sessionStorage.getItem("token");

    const config = {
      headers: {
        authorization: token
      }
    };

    axios.get(url, config)
      .then((resp) => {
        console.log(resp.data);

        if (resp.data.status === "error") {
          setAlertData({
            titulo: 'Error',
            detalle: resp.data.error,
            check: false
          });
          setShowAlert(true);
        } else {
          setAdmins(resp.data.usuarios);
        }
      })
      .catch((error) => {
        console.log(error);

        setAlertData({
          titulo: 'Error',
          detalle: error.response ? error.response.data.error : 'Error de red',
          check: false
        });
        setShowAlert(true);
      });
  }
  
  useEffect(() => {
    buscarAdmins();
  }, []);

  return (

    <div className='w-screen flex justify-end'>
    <div className="flex h-screen w-full  bg-gray-300">
    {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
      {/* <NavbarAdmins /> */}



      <div className="flex-1  bg-white">
        {/* Buscador*/}
        <div className="flex items-center mt-14 bg-cyan-700 p-4 mb-6 justify-center w-full">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-1/2 p-2 rounded-md outline-none"
            style={{ minWidth: '200px' }}
          />
          <div className="ml-4">
            <button
              className="p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold"
              onClick={handleOpenModal}
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Lista de Administradores */}
        <div className="space-y-4 p-6 flex flex-col items-center ">
          {admins?.map((admin, index) => (
            <AdminsItem modalEditar= {()=> handleOpenModal()} key={admin.id} admin={admin} />
          ))}
        </div>


        {/* Modal para Agregar */}
        <ModalAdmin isOpen={isModalOpen} onClose={handleCloseModal} title="Agregar Administrador">
        <img src={iconoPersona} alt="Icono de usuario" className="h-8 w-8 mr-8" /> 
        </ModalAdmin>

      </div>
    </div>
  </div>
  );
}
