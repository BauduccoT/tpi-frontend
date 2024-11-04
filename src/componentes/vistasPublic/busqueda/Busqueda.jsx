import { useEffect, useState } from "react"
import { useParams } from "wouter"
import axios from "axios"
import ContenedorProductos from "../../comun/ContenedorProductos"

export default function Busqueda (props){
    const params = useParams()

    const [listaProd, setListaProd]=useState([])
    

    useEffect(()=>{
        const url='http://localhost:3000/api/productos/busqueda'
        const data={
            params:{
                prod:params.prod
            }
        }
        axios.get(url, data)
        .then((resp)=>{
           setListaProd(resp.lista)
        })
        .catch((error)=>{
            alert('error')
        })
    },[])

    return(
        <div className="w-screen mt-14 sm:mt20"> 
            {/* <ContenedorProductos lista={listaProd}/> */}
        </div>
    )
}