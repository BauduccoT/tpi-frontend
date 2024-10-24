import React from "react";

export default function Producto(){

    return(
        <div className="bg-gray-100 w-full min-h-screen gap-6 flex-wrap justify-center items-center">
            <div className="w-60 p-h2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-2x1 mt-4 mb-4 lg:mt-0"></div>
            <img src="descargas/teclado" alt="" />
            <div className="p-2">
                <h2 className="font-bold text-lg mb-2">Holaaa</h2>
                <span class="text-xl font-semibold">$98.000</span>

                <div className="flex items-center gap-2"> 
                    <span class="text-sm ">Descripcion producto</span>
                </div>

                <div className="flex items-center justify-center gap-2 mb-3">
                    <button class="px-3 py-1 rounded-lg bg-gray-600 hover:bg-gray-500"> Comprar</button>
                </div>
            </div>
        </div>
    )
}