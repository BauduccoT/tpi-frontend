import React from "react";
import Producto from "./Producto";

export default function ContenedorProductos(){

    return(
        <div className=" flex justify-center items-center flex-wrap gap-5">
            <Producto />
            <Producto/>
            <Producto/>
            <Producto/>
            <Producto/>
            <Producto/>
            <Producto/>
            <Producto/>
        </div>
    )
}