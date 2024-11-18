import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../comun/Alert";
import { useParams } from "wouter";


export default function VistaProducto() {

    const params=useParams()

    const [producto,setProducto]=useState({});
    const [unidades, setUnidades]=useState(1)
    const [enCarrito,setEnCarrito]=useState(false)

    const [showAlert, setShowAlert]=useState(false)
    const [alertData, setAlertData]=useState({})

    function revisarCarrito(prodId){
        if(sessionStorage.getItem("carrito")!==null){
            let carrito=JSON.parse(sessionStorage.getItem("carrito"))
            let existe=false
            for(let i=0; i<carrito.length;i++){
                if(carrito[i].id==prodId){
                    existe=true
                    setEnCarrito(true)
                    break
                }
            }
        }
    }

    function guardarCarrito(prod){
        
        let carrito=sessionStorage.getItem("carrito")
        
        if(carrito==null){
            console.log('se crea el carrito');
            
            let array=[{
                id:prod.id,
                nombre:prod.nombre,
                precio:prod.precio_unidad,
                img:prod.img_url,
                stock:prod.stock,
                unidades:unidades,
            }]
            sessionStorage.setItem("carrito",JSON.stringify(array))
            setEnCarrito(true)
        }
        else {
            let nuevoCarrito=JSON.parse(carrito)
            let existe=false
            for(let i=0; i<nuevoCarrito.length;i++){
                if(nuevoCarrito[i].id==prod.id){
                    existe=true
                    setEnCarrito(true)
                    break
                }
            }
            if(existe==false){
                nuevoCarrito.push({
                    id:prod.id,
                    nombre:prod.nombre,
                    precio:prod.precio_unidad,
                    img:prod.img_url,
                    stock:prod.stock,
                    unidades:unidades,
                })
                sessionStorage.setItem("carrito",JSON.stringify(nuevoCarrito)) 
                setEnCarrito(true)
            }
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
            if(resp.data.producto[0]){
                setProducto(resp.data.producto[0])
                revisarCarrito(resp.data.producto[0].id) //revisar que el producto no aparezca en el carrito
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
            console.log(error)
            setAlertData({
                titulo:'Error',
                check:false
            })
            setShowAlert(true)
        })
    }

    function validacionInput(valorInput){
        if (/^[0-9]*$/.test(valorInput)){
            if (valorInput == '' || valorInput == '0') setUnidades("")
            else if(parseInt(valorInput)> parseInt(producto.stock)) setUnidades(parseInt(producto.stock))
            else setUnidades(parseInt(valorInput))
        } 
    }

    function blurInput(valorInput){
        if(valorInput=='' || valorInput=='0') setUnidades(parseInt(1))
    }

    useEffect(()=>{
        buscarProducto()
    },[])

    return(
        <div className="flex flex-col sm:flex-row sm:justify-end left-0 right-0 sm:h-scren mt-14 p-1 sm:p-2 sm:mt-20">
            {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
            
            <div className="sm:fixed sm:top-0 sm:left-0 sm:mt-20 flex flex-col justify-center items-center w-full sm:w-1/3 p-2 sm:p-3 rounded-md border-solid border border-slate-400 sm:ml-6">

                <div className="flex max-h-60 sm:max-h-80  sm:max-w-64 p-2 ">
                    <img className="max-h-full" src={`http://localhost:3000/${producto.img_url}`}/>
                </div>
            </div>

            <div className="flex w-full flex-col-reverse justify-between sm:flex-row sm:w-2/3 gap-10 sm:gap-2 p-2 sm:px-3">
                <div className="flex text-xl flex-col w-full p-3 sm:p-4 sm:w-2/4 md:w-4/6 m-3">
                    <p>Descripcion:</p>
                    <br />
                    {producto.descripcion}
                </div>

                <div className="flex flex-col content-center w-full p-3 gap-5 shadow-lg rounded-md sm:h-fit  sm:py-12 bg-slate-100 sm:p-3 md:p-6 sm:w-2/4 md:w-2/6">
                    
                    <p className="flex text-2xl text-center justify-center ">{producto.nombre}</p>
                    <p className="flex text-2xl justify-center ">$ {producto.precio_unidad}</p>
                
                    <p className="flex text-xl justify-center ">Unidades:</p>
                    <div className="flex flex-row p-2 justify-center items-center h-15 gap-4 sm:gap-1 md:gap-3">
                        <button 
                            onClick={()=>setUnidades(unidades>1?unidades-1:1)} 
                            disabled={unidades==1||enCarrito==true?"disabled":""} 
                            className="disabled:bg-slate-200 disabled:text-slate-400 p-3 w-1/5 sm:p-2 
                            flex justify-center items-center rounded-md hover:bg-slate-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-1/5 sm:w-4/5 min-w-5">
                                <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <input type="text"
                            autoComplete="off"
                            onChange={(e)=>validacionInput(e.target.value)}
                            value={unidades}
                            onBlur={(e)=>blurInput(e.target.value)}
                            onKeyDown={(e)=>{if(e.key === 'Enter')e.target.blur()}}
                            disabled={enCarrito==true?"disabled":""}
                            className="disabled:bg-slate-100 disabled:outline disabled:outline-1 disabled:outline-slate-400 flex p-2 h-4/5 rounded-md text-center items-center w-3/5 sm:w-2/6 md:w-3/5 focus:outline-none"
                        />

                        <button 
                            onClick={()=>setUnidades(unidades<producto.stock?unidades+1:producto.stock)}
                            disabled={unidades==producto.stock||enCarrito==true?"disabled":""}
                            className="disabled:bg-slate-200 disabled:text-slate-400 p-3 w-1/5 sm:p-2
                            flex justify-center items-center rounded-md hover:bg-slate-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-1/5 sm:w-4/5 min-w-5">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <button className="w-full text-white bg-orange-500 hover:bg-orange-600 p-3 rounded-md disabled:bg-orange-600"
                        onClick={()=>guardarCarrito(producto)}
                        disabled={enCarrito==true?"disabled":""}
                    >
                        {enCarrito==true?"En el carrito":"Agregar al carrito"}
                    </button>
                </div>

            </div>
            
        </div>
    );
}