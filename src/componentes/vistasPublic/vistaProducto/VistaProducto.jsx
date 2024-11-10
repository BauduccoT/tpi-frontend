import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../comun/Alert";
import iconoQuitar from "../../../assets/dash-square.svg"
import iconoAgregar from "../../../assets/plus-square.svg"
import { useParams } from "wouter";


export default function VistaProducto() {

    const params=useParams()

    const [producto,setProducto]=useState({});

    const [showAlert, setShowAlert]=useState(false)
    const [alertData, setAlertData]=useState({})

    function guardarCarrito(prod){
        
        let carrito=sessionStorage.getItem("carrito")
        
        if(carrito==null){
            console.log('se crea el carrito');
            
            let array=[prod]
            sessionStorage.setItem("carrito",JSON.stringify(array))
        }
        else {
            let nuevoCarrito=JSON.parse(carrito)
            nuevoCarrito.push(prod)
            sessionStorage.setItem("carrito",JSON.stringify(nuevoCarrito))

            // falta revisar que no se repita el producto
        }
    }

    function buscarProducto(){
        const url='http://localhost:3000/api/productos'
        const data={
            params:{
                id:params.id
            }
        }
        axios.get(url, data)
        .then((resp)=>{
            // console.log(resp.data.producto[0])
            if(resp.data.producto[0])setProducto(resp.data.producto[0])
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
            console.log(error)
            setAlertData({
                titulo:'Error',
                check:false
            })
            setShowAlert(true)
        })
    }

    useEffect(()=>{
        buscarProducto()
    },[params.id])

    return(
        <div className="flex flex-col sm:flex-row sm:justify-end w-full sm:h-scren mt-14 p-1 sm:p-2 sm:mt-20">
            {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
            
            <div className="sm:fixed sm:top-0 sm:left-0 sm:mt-20 flex flex-col justify-center items-center w-full sm:w-1/3 p-2 sm:p-3">

                <div className="flex min-w-full sm:max-h-80 px-10 sm:px-20 border-solid border border-slate-400">
                    <img className="min-w-full h-auto " src={`http://localhost:3000/${producto.img_url}`}/>
                </div>
            </div>

            <div className="flex w-full flex-col-reverse justify-between sm:flex-row sm:w-2/3 gap-10 sm:gap-2 p-2 sm:px-3">
                <div className="flex text-xl sm:flex-col w-full p-3 sm:p-4 sm:w-2/4 md:w-4/6">
                    <p>Descripcion:</p>
                    <br />
                    {producto.descripcion}
                </div>

                <div className="flex flex-col content-center w-full p-3 gap-7 shadow-lg rounded-md sm:h-fit  sm:py-12 bg-slate-100 sm:p-3 md:p-6 sm:w-2/4 md:w-2/6">
                    <p className="flex text-2xl justify-center">{producto.nombre}</p>
                    <p className="flex text-xl justify-center ">$ {producto.precio_unidad}</p>
                    <div className="flex flex-row justify-center items-center gap-3">
                        <button className="flex justify-center items-center max-h-min w-fit md:rounded-md hover:bg-slate-300 md:h-8 md:w-8">
                            <img className="w-4 min-w-3" src={iconoQuitar} alt="" />
                        </button>
                        <p className=" flex justify-center items-center">unidades</p>
                        <button className="flex justify-center items-center max-h-min w-fit md:rounded-md hover:bg-slate-300 md:h-8 md:w-8">
                            <img className="w-4 min-w-3" src={iconoAgregar} alt="" />
                        </button>
                    </div>
                    <button className="w-full text-white bg-orange-500 hover:bg-orange-600 p-3 rounded-md"
                        onClick={()=>guardarCarrito(producto)}                    
                    >
                        Agregar al carrito
                    </button>
                </div>

            </div>
            
        </div>
    );
}