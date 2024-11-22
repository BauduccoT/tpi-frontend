import check from '../../assets/check-circle.svg'
import cruz from '../../assets/x-circle.svg'
import { Link } from 'wouter'

export default function Alert ({data, click, check}){
    return(
        <div className="flex h-screen z-30 w-screen fixed top-0 left-0 right-0 justify-center items-center bg-slate-500/30 backdrop-blur-sm ">
            <div className="flex flex-col p-4 justify-center items-center bg-gray-50 min-h-80 w-4/5 sm:w-4/6 md:w-3/6 lg:w-2/6 gap-5 transition-all duration-200 rounded-md">
                 {data.check==true ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-3 size-14 text-green-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-3 size-14 text-red-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        }
                <h1 className='text-2xl'>{data.titulo}</h1>
                {data.detalle!==""?<p className='flex justify-center p-2 m-2'>{data.detalle}</p>:null}
                {data.login==true
                ?
                <div className='text-center'>
                    Para poder relizar una compra debes tener una sesión activa. haz click <Link className="text-decoration-line: underline" to='/login'>aquí</Link> para iniciar sesión
                </div>
                :null}
                
                <button className="mt-4 px-5 py-3 rounded-md bg-orange-500 text-white" onClick={()=>click(false)}>cerrar</button>
            </div>
        </div>
    )
}