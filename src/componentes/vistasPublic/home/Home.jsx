import { useState, useEffect } from "react";
import Alert from "../../comun/Alert";
import ContenedorCategorias from '../../comun/ContenedorCategorias'
import axios from "axios";
import ContenedorProductos from '../../comun/ContenedorProductos'
// import Categoria from '../../comun/Categoria'
// import Producto from '../../comun/Producto'
// import { useLocation } from "wouter";


export default function Home(){
    const [listaProd, setListaProd] = useState([]);
    const [showAlert, setShowAlert] = useState(false)
    const [alertData, setAlertData] = useState({})


    //función pra obtener los productos
    useEffect(()=>{
        theMostWanted()
    },[])

    function theMostWanted() {
        const url = 'http://localhost:3000/api/productos/most-wanted';   
        axios.get(url)
        .then((resp) => {
            if (resp.data.mostWanted) setListaProd(resp.data.mostWanted)
            if(resp.data.error){
                setListaProd([])
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
    

    
    return (
        <div className="mt-14 sm:mt20">
        {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
            <ContenedorCategorias/>
            {listaProd!==null?<ContenedorProductos listaProductos={listaProd}/>:null}
           
        </div>
    )
}



