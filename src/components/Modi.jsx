import React,{useEffect,useState} from 'react'
import {db} from '../config/config'
import {Link, useParams} from 'react-router-dom'
import './Dashboard.css'



const Modi = () => {
//-------------Use Params---------------------
    const {identy} = useParams()

//----------------Variables UseState--------------
    var [Lista, setLista] = useState([])
    const [show, setshow] = useState([])
    const [Nombre, setNombre] = useState('')
    const [Apellido, setApellido] = useState('')
    const [Cedula, setCedula] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [Direccion, setDireccion] = useState('')
    const [Local, setLocal] = useState('')
    const [Total, setTotal] = useState(0.0)
    const [Pagado, setPagado] = useState(0.0)
    const [Codigo, setCodigo] = useState('')



//--------------Obtener datos de firebase------------------------
const obtener = async()=>{
    await db.collection('clientes').onSnapshot((querySnapshot)=>{
        const datos=[];
        querySnapshot.forEach((doc)=>{
            datos.push({...doc.data(), id:doc.id})
        })
        let filtro=datos.filter(dato=>dato.id === identy)
        setshow(filtro)
        
    })
}

//-------------Listado de datos actualizados-------------
const registrar = (e) =>{
    e.preventDefault()
    setLista({
        Local:Local,
        Codigo:Codigo,
        Nombre: Nombre,
        Apellido: Apellido,
        Cedula: Cedula,
        Telefono:Telefono,
        Direccion:Direccion,
        Total: parseFloat(Total),
        Pagado: parseFloat(Pagado)
    })
}

//------------------------UseEffect-----------------
useEffect(() => {
    if(Lista.Nombre){
        usuarios()
        
    }
}, )

useEffect(() => {
   obtener()
   
}, )


//--------------------Datos de datos----------------
const usuarios =()=>{ 
db.collection('clientes')
.doc(identy)
.update(Lista)
}


    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-11 todo">
                <br />
              
                <h3 className='text-black-50 text-center'>Llene todos los datos</h3>
                <hr className="bg-info border-2 border-top border-info"/>
                <br />


                    <form autoComplete='off' className="form-group" onSubmit={registrar}>
                    {show.map(data=>{return(
                    <div>
                    
                    <div className="form-floating mb-3">
                            <input type="text" className='form-control' maxLength='5' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setCodigo(e.target.value)}
                            />
                            <label htmlFor="floating-name">Codigo: {data.Codigo}</label>
                        </div>

                    <div className="form-floating mb-3">
                            <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setCedula(e.target.value)}
                            />
                            <label htmlFor="floating-name">Cedula actual: {data.Cedula}</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setLocal(e.target.value)}
                            />
                            <label htmlFor="floating-name">Local: {data.Local}</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setNombre(e.target.value)}
                            />
                            <label htmlFor="floating-name">Nombre actual: {data.Nombre}</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className='form-control' required id='floating-name' placeholder='Apellido'
                                onChange={(e)=>setApellido(e.target.value)}
                            />
                            <label htmlFor="floating-name">Apellido actual: {data.Apellido}</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setTelefono(e.target.value)}
                            />
                            <label htmlFor="floating-name">Telefono actual: {data.Telefono}</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setDireccion(e.target.value)}
                            />
                            <label htmlFor="floating-name">Direccion actual: {data.Direccion}</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className='form-control' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setTotal(e.target.value)} value={Total}
                            />
                            <label htmlFor="floating-name">Valor total actual: {data.Total}</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className='form-control' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setPagado(e.target.value) } value={Pagado}
                            />
                            <label htmlFor="floating-name">Valor pagado actual: {data.Pagado}</label>
                        </div>
                    </div>
                    )})}
                    <button className="btn btn-success form-control">Actualizar datos</button>
                    <Link to='/modificar'  className="btn btn-danger form-control mt-2 mb-5" >Regresar</Link>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Modi
