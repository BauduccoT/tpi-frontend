import React from "react";
import { Link, useLocation } from "wouter";


export default function Producto({prod}) {
    const [location, setLocation]=useLocation()

    return (
        <div className="w-full sm:w-min flex justify-center items-center p-5">
            <div onClick={()=>setLocation(`/producto/${prod.id}`)}
            className="flex items-center flex-col w-full 
                sm:w-60 p-6 bg-slate-200 rounded-md shadow-lg
                transform transition-all hover:-translate-y-2 duration-300
                 sm:h-96 cursor-pointer"
            >
                <div className="flex flex-row sm:flex-col w-full gap-5">
                    <div className=" w-2/4 sm:w-full h-40 bg-white rounded-md flex items-center justify-center">
                        <img src={`http://localhost:3000/${prod.img_url}`} alt="" className="max-h-full max-w-full"/>
                    </div>
                    
                    <div className="p-4 w-2/4 sm:w-full overflow-hidden ">
                        <h2 className="font-bold text-lg mb-2 ">{prod.nombre}</h2>
                        <span className="text-xl font-semibold">$ {prod.precio_unidad}</span>

                        <div className="flex items-center  mt-2"> 
                            <span className="text-sm">{prod.descripcion}</span>
                        </div>
                    </div>
                </div>
            </div>     
        </div> 
    );
}