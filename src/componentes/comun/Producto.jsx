import React from "react";
import { Link } from "wouter";


export default function Producto(props) {
    

    return (
        <div className=" flex justify-center items-center">
            <div className="w-60 p-6 bg-slate-200 rounded-md shadow-lg transform transition-all hover:-translate-y-2 duration-300">
                <div className="h-40 bg-white rounded-md flex items-center justify-center">
                    <img src="..." alt="" />
                </div>
                
                <div className="p-4">
                    <h2 className="font-bold text-lg mb-2">{props.prod.nombre}</h2>
                    <span className="text-xl font-semibold">$ {props.prod.precio_unidad}</span>

                    <div className="flex items-center gap-2 mt-2"> 
                        <span className="text-sm">Descripción del producto</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-3 mt-4">
                        <Link to={`/producto/${props.prod.id}`}>
                            <button className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition duration-200">Comprar</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
        
    );
}