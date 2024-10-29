import { useState } from "react";

import ContenedorCategorias from '../../comun/ContenedorCategorias'
import Categoria from '../../comun/Categoria'
import ContenedorProductos from '../../comun/ContenedorProductos'
import Producto from '../../comun/Producto'


export default function Home(){
    
    return (
        <div className="mt-14 sm:mt20">
            <ContenedorCategorias/>
            <ContenedorProductos/>
        </div>
    )
}
