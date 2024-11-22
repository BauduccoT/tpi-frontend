import { useEffect, useState } from 'react';
import axios from "axios";
import Alert from '../../comun/Alert';

export default function ModalProd({cerrarModal, newProd, editarProd, prod}) {

  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    precio_unidad: "",
    stock: "",
    descripcion: "",
    imagen: null,
  });

  const [inputRadio, setInputRadio]=useState(null)

  const [categoriasOpen, setCategoriasOpen]=useState(false)
  const [listaCategorias, setListaCats] = useState([]);

  const [editar, setEditar]=useState(false)

  useEffect(()=>{
    if(prod!==null) cargarProd()
    getCategorias()
  },[])

  function finalizar(){
    if(editar==false) newProd(form, inputRadio)
    else editarProd(form, inputRadio)
  }

  function cargarProd(){
    setEditar(true)
    setForm({
      nombre: prod.nombre,
      precio_unidad: prod.precio_unidad,
      stock: prod.stock,
      descripcion: prod.descripcion,
    }) 
  }

  function getCategorias() {
    const url = 'http://localhost:3000/api/categorias';
    axios.get(url)
    .then((resp) => {      
      if(prod!==null && resp.data.categorias) getCatProd(resp.data.categorias) + console.log("ejecuta esto");
      
      else if(resp.data.categorias) setListaCats(resp.data.categorias)  + console.log("ejecuta esto otro");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function getCatProd(lista){
    
    const url = 'http://localhost:3000/api/productos/categoria';
    const token = sessionStorage.getItem("token");
    
    const config={
      params:{
        id:prod?.id
      },
      headers:{
        authorization:token
      }
    }
    
    axios.get(url,config)
    .then((resp) => {
      if(resp.data.categoria){
        let catsProd=resp.data.categoria
        
        
        let listaActualizada = [...lista]
        for(let i=0; i<listaActualizada.length; i++){
          for(let j=0; j<catsProd.length; j++){
            if(listaActualizada[i].id==catsProd[j].id_categoria){              
              setInputRadio(listaActualizada[i].id)
              break
            }
          }
        }
      }
      setListaCats(lista)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleFileChange = (e) => {
    setForm({ ...form, imagen: e.target.files[0] });
  };  

  const validacionInput = (valorInput, field) => {
    if (/^[0-9]*$/.test(valorInput)) {
      if (valorInput === '' || valorInput === '0') {
        setForm({ ...form, [field]: '' });
      } else {
        setForm({ ...form, [field]: valorInput });
      }
    }
  }
  const blurInput = (valorInput, field) => {
    if (valorInput === '' || valorInput === '0') {
      setForm({ ...form, [field]: '1' });
    }
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button
          onClick={()=>cerrarModal()}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl hover:bg-slate-300 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg font-bold mb-6 text-center">{editar==false?"Crear producto":"Modificar producto"}</h2>
        
        <div className={`space-y-4 transition-all duration-200 ${categoriasOpen==true?"h-0 overflow-hidden":" h-70"}`}>
          <input
            type="text"
            placeholder="Nombre Producto"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="text"
            value={form.precio_unidad}
            onChange={(e) => validacionInput(e.target.value, 'precio_unidad')}
            onBlur={(e) => blurInput(e.target.value, 'precio_unidad')}
            placeholder="Precio Unidad"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="text"
            value={form.stock}
            onChange={(e) => validacionInput(e.target.value, 'stock')}
            onBlur={(e) => blurInput(e.target.value, 'stock')}
            placeholder="Stock"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripcion"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="file"
            name="imagen"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:cursor-pointer cursor-pointer file:transition-all file:duration-150 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500"
            placeholder="seleccionar imagen"
          />
        </div>
        <div className={`flex flex-row  ${categoriasOpen==true?"mb-5":"mt-5"}`}>
          <button onClick={()=>setCategoriasOpen(!categoriasOpen)} className='bg-cyan-600 text-white rounded-md p-2 px-4 flex flex-row font-semibold gap-2'>
            <p className=''>Categorias</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${categoriasOpen==true?"":"rotate-180"}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        <form  className={`space-y-4 transition-all duration-300 ${categoriasOpen==false?"h-0 overflow-hidden":"overflow-y-auto max-h-60"}`}>
          {listaCategorias.map((categoria,index)=>
            <div className='flex items-center gap-2 p-2' key={categoria.id}>
              <input id={categoria.id} type="radio" checked={categoria.id==inputRadio?true:false} value={categoria.id} name='listaCategorias' onChange={(e)=>setInputRadio(e.target.value)}
                className='mb-0.5 cursor-pointer appearance-none h-5 w-5 rounded-full bg-gray-300 checked:bg-cyan-600 outline-none' 
              />
              <label htmlFor={categoria.id} className='cursor-pointer'>
                {categoria.nombre}
              </label>
            </div>
          )}
        </form>

        <button
          onClick={()=>finalizar()}
          className="mt-6 w-full py-2 bg-cyan-600 font-medium hover:bg-cyan-500 transition-all duration-150 text-white rounded-md active:bg-cyan-800"
        >
          {editar==false?"Crear":"Modificar"}
        </button>
      </div>
    </div>
  );
}
