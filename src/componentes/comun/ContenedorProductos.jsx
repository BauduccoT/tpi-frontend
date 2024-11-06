import React, { useEffect, useState } from "react";
import Producto from "./Producto";

export default function ContenedorProductos(props){

    const [lista, setLista]=useState([])

    useEffect(()=>{
        setLista(props.lista)
    })
    

    return(
        <div className=" flex justify-center items-center flex-wrap gap-5">
            {lista.map((prod,index)=>
                
                <Producto key={prod.id} prod={prod}/>
            )}
        </div>
    )
}