import check from '../../assets/check-circle.svg'
import cruz from '../../assets/x-circle.svg'

export default function Alert (props){
    return(
        <div className="flex h-screen w-screen fixed top-0 left-0 right-0 justify-center items-center bg-slate-500/30 backdrop-blur-sm">
            <div className="flex flex-col justify-center items-center bg-gray-50 h-80 w-4/5 sm:w-4/6 md:w-3/6 lg:w-2/6 gap-5 transition-all duration-200">
                <img className='h-10' src={props.check==true ? check : cruz} alt="" />
                <h1>{props.titulo}</h1>
                {props.detalle?<p>{props.detalle}</p>:null}
                <button className="mt-10 px-5 py-3 bg-orange-500 text-white" onClick={()=>props.click(false)}>cerrar</button>
            </div>
        </div>
    )
}