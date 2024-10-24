import React, { useState } from "react"
import { Link } from 'wouter'

export default function Categoria (){
    const [categoria, setCatecorias]= useState("")
return(
    <div className="container justify-center">
    <div className="flex h-64  justify-center  flex-wrap content-between" >
        <div class="bg-blue-950  text-slate-50 text px-4 py-2 m-2 w-60 rounded-md"> Monitores </div>
    </div>
</div>
)
}
