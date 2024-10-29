import { useEffect, useState } from "react";

import iconoQuitar from "../../../assets/dash-square.svg"
import iconoAgregar from "../../../assets/plus-square.svg"
import { useLocation } from "wouter";


export default function VistaProducto() {

    const [producto,setProducto]=useState({
        img:undefined,
        nombre:"",
        precioUnidad:"",
        categorias:[],
        descripcion:""
    });

    const [location, setLocation]=useLocation()

    useEffect(()=>{
        
    },[])

    return(
        <div className="flex flex-col sm:flex-row sm:justify-end w-full sm:h-scren mt-14 p-1 sm:p-2 sm:mt-20">
            
            <div className="sm:fixed sm:top-0 sm:left-0 sm:mt-20 flex flex-col justify-center items-center w-full sm:w-1/3 p-2 sm:p-3">

                <div className="flex min-w-full px-6 border-solid border border-slate-400">
                    <img className="min-w-full h-auto " src={iconoAgregar}/>
                </div>
            </div>

            <div className="flex w-full flex-col-reverse sm:flex-row sm:w-2/3 gap-10 sm:gap-2 p-2 sm:px-3">
                <div className="flex w-full p-3 sm:p-4 sm:w-3/5 md:w-3/4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, molestias illum ipsum aut doloremque minima voluptate maxime porro architecto quia mollitia? Eius neque qui, enim placeat illo minus cum non.
                    Libero praesentium illo inventore itaque repellendus tempora deleniti illum omnis minima, corporis officia delectus similique impedit non, nostrum maxime cum voluptates cupiditate. Eos minus veniam tempora consequuntur distinctio at nam.
                    Rem esse incidunt similique officia eos architecto ipsam obcaecati asperiores, fuga, quidem in ea nemo amet quia aliquid veniam repellendus dolore sit illum corporis? Tempora quae aliquid natus incidunt at?
                    Vitae enim, reiciendis, temporibus animi, ullam illo hic id cupiditate nulla dolor veritatis autem ipsum aspernatur. Possimus, inventore ex. Necessitatibus quia enim nostrum adipisci ducimus natus blanditiis veniam a libero.
                    Eius dolorum delectus, mollitia magnam aliquam cupiditate. Omnis, consequatur iure minima perferendis hic consequuntur voluptatem, ut animi atque rerum dignissimos eaque in quasi illo? Libero placeat cum cupiditate quisquam. Doloribus?
                    Est earum unde facilis. Laboriosam nihil quasi eius blanditiis id. Labore in eos inventore autem? Possimus odit est, esse placeat, hic similique harum dolores quaerat dolorum quas natus aliquam totam.
                    Quaerat error accusamus consequatur esse accusantium aperiam quia pariatur quas, molestias magni vel molestiae quo necessitatibus saepe, consequuntur officia optio. Aspernatur quod aut possimus qui laborum. Tempora, ipsam voluptate? Doloribus.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, impedit consequatur eius, aliquid at reiciendis debitis id recusandae quas ut culpa odio! Inventore harum accusantium dignissimos neque id odit eaque!Lorem
                </div>

                <div className="flex flex-col content-center w-full p-1 gap-7 shadow-lg rounded-md sm:h-fit  sm:py-12 bg-slate-100 sm:p-3 sm:w-2/5 md:w-1/4">
                    <p className="flex text-2xl justify-center">Titulo</p>
                    <p className="flex text-xl justify-center ">precio</p>
                    <div className="flex flex-row justify-center items-center gap-3">
                        <button className="flex justify-center items-center max-h-min w-fit md:rounded-md hover:bg-slate-300 md:h-8 md:w-8">
                            <img className="w-4 min-w-3" src={iconoQuitar} alt="" />
                        </button>
                        <p className=" flex justify-center items-center">unidades</p>
                        <button className="flex justify-center items-center max-h-min w-fit md:rounded-md hover:bg-slate-300 md:h-8 md:w-8">
                            <img className="w-4 min-w-3" src={iconoAgregar} alt="" />
                        </button>
                    </div>
                    <button className="w-full text-white bg-orange-500 hover:bg-orange-600 p-3 rounded-md" >
                        Agregar al carrito
                    </button>
                </div>

            </div>
            
        </div>
    );
}