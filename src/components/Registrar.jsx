import React,{useState,useEffect} from 'react'

import './Dashboard.css'
import {db} from '../config/config'

const Registrar = () => {

//----------- Variables de datos que se envian a Firebase ----------------
    var [Lista, setLista] = useState([])
    const [Nombre, setNombre] = useState('')
    const [Apellido, setApellido] = useState('')
    const [Total, setTotal] = useState(0.0)
    const [Pagado, setPagado] = useState(0.0)
    const [Url, setUrl] = useState('')
    const [cedula, setcedula] = useState('')
    const [local, setlocal] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [Direccion, setDireccion] = useState('')
    const [regi, setregi] = useState([])
    const [codigo, setcodigo] = useState('')
    



//----------------Fecha y hora-------------------
var f = new Date()
var Fecha =(f.getDate()+'/'+(f.getMonth()+1)+'/'+f.getFullYear())
var Hora =(f.getHours()+':'+f.getMinutes()+':'+f.getSeconds())

//------:::::: Acción del boton de registro :::::::----------
const registrar = (e) =>{
    e.preventDefault()
        setLista({
            Local: local,
            Codigo:codigo,
            Nombre: Nombre,
            Apellido: Apellido,
            Cedula: cedula,
            Telefono:Telefono,
            Direccion:Direccion,
            Total: parseFloat(Total),
            Pagado: parseFloat(Pagado)
        
        })
        setregi({
            Url:Url,
            Codigo:codigo,
            Cedula:cedula,
            Nombre: Nombre,
            Apellido: Apellido,
            Fecha:Fecha,
            Hora: Hora,
            Pagado: parseFloat(Pagado)

        })
    }


//------------------Envio de datos a Firebase-----------
const baseData= async(linkObject)=>{
    await db.collection('clientes').doc().set(Lista)
    await db.collection('Historial2').doc().set(regi)
    .then(window.location='/clientes')
    }



//---------------Validacion de datos-------------------
    useEffect(() => {
        if(Lista.Nombre){
            baseData()
        }
        else{
            console.log('Error en la aceptacion de datos')      
        }
    }, )


    return (
        <div className="container">
          <div className="row">

            <div className="col-md-8 grafica">
            <h3 className='text-center text-black-50'>Registro de clientes</h3>
    
            <br />
                <form autoComplete='off' className="form-group text-center" onSubmit={registrar}>

                <div className="form-floating mb-3">
                        <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                            onChange={(e)=>setUrl(e.target.value)}
                        />
                        <label htmlFor="floating-name">Url de la orden de pago</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className='form-control' required id='floating-name' maxLength='5' placeholder='Apellido'
                            onChange={(e)=>setcodigo(e.target.value)}
                        />
                        <label htmlFor="floating-name">Codigo</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                            onChange={(e)=>setNombre(e.target.value)}
                        />
                        <label htmlFor="floating-name">Nombre</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className='form-control' required id='floating-name' placeholder='Apellido'
                            onChange={(e)=>setApellido(e.target.value)}
                        />
                        <label htmlFor="floating-name">Apellido</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className='form-control' required id='floating-name' placeholder='Apellido'
                            onChange={(e)=>setcedula(e.target.value)}
                        />
                        <label htmlFor="floating-name">Cedula</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                            onChange={(e)=>setTelefono(e.target.value)}
                        />
                        <label htmlFor="floating-name">Telefono</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                            onChange={(e)=>setDireccion(e.target.value)}
                        />
                        <label htmlFor="floating-name">Direccion</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className='form-control' required id='floating-name' placeholder='Apellido'
                            onChange={(e)=>setlocal(e.target.value)}
                        />
                        <label htmlFor="floating-name">Local</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className='form-control' required id='floating-name' placeholder='Nome'
                            onChange={(e)=>setTotal(e.target.value)} value={Total}
                        />
                        <label htmlFor="floating-name">Valor total</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="number" className='form-control' required id='floating-name' placeholder='Nome'
                            onChange={(e)=>setPagado(e.target.value) } value={Pagado}
                        />
                        <label htmlFor="floating-name">Valor pagado</label>
                    </div>


                    <button className="btn btn-dark btn-md w-50 mb-5"> <h5> REGISTRAR CLIENTE</h5></button>

                </form>
            </div>
          </div>
      </div>
    )
}

export default Registrar
