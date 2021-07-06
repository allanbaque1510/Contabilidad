import React,{useState, useEffect} from 'react'

import {db} from '../config/config'
import {useParams} from 'react-router-dom'
import './Dashboard.css'
const Pagar = () => {

    const {identificador} = useParams()
    const {nombre} = useParams()
    const {apellido} = useParams()
    const {total} = useParams()
    const {pagado} = useParams()
    const {cedula} = useParams()


    const [Url, setUrl] = useState('')
    const [Lista, setLista] = useState([])
    const [valor, setvalor] = useState(0.0)
    const [Historial, setHistorial] = useState([])
    
//----------------Fecha y hora-------------------
var f = new Date()
var Fecha =(f.getDate()+'/'+(f.getMonth()+1)+'/'+f.getFullYear())
var Hora =(f.getHours()+':'+f.getMinutes()+':'+f.getSeconds())


//--------------Obtener datos de firebase------------------------

    

//------------USe Effect para obtener los datos cuando carga la pagina------



const cobrar = (e) =>{
    e.preventDefault()
        setHistorial({Nombre:nombre,
            Apellido:apellido,
            Cedula:cedula,
            Fecha:Fecha,
            Hora:Hora,
            Pagado:parseFloat(valor),
            Url: Url,
        })
        setLista({
            Pagado:parseFloat(valor)+parseFloat(pagado)
        })   
}
//--------Reload despues de enviar los datos------------
const reload = () => {
    window.location.reload(true);
}
//------------------Envio de datos a Firebase-----------
const baseData= async(linkObject)=>{
    await db.collection('Historial2').doc().set(Historial)
    await db.collection('clientes').doc(identificador).update(Lista)
    setTimeout(reload,1000)
    .then(window.location='/')
}



//---------------Validacion de datos-------------------

useEffect(() => {
    if(Historial.Url){

        baseData()
    }
}, )




//------------------Html--------------------------------------
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-11 d-flex justify-content-center">
                <div className=''>
                <div className="border border-light border-2 rounded p-2 mt-5">
              
                <table className="table table-borderless">
                    <thead className='text-center'>
                        <tr>
                            <th colSpan='2'> <h2 className='text-black-50 mb-4'>Datos del Cliente </h2></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b> Cliente:</b></td>
                            <td>{nombre} {apellido}</td>
                        </tr>
                        <tr>
                            <td><b> Identificacion:</b></td>
                            <td>{cedula}</td>
                        </tr>
                       
                      
                        <tr>
                            <td> <b> Total a pagar:</b></td>
                            <td className='text-success'>${parseFloat(total).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td> <b> Valor pagado:</b> </td>
                            <td className='text-success'>${parseFloat(pagado).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td> <b>Valor de la deuda:</b></td>
                            <td className='text-danger'>${parseFloat(total - pagado).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                
                <form autoComplete='off' className="form-group" onSubmit={cobrar}>
                    <div className="form-floating mb-3">
                            <input type="number" className='form-control' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setvalor(parseFloat(e.target.value))} value={valor}
                            />
                            <label htmlFor="floating-name">Pago del cliente:</label>
                    </div>
                    <div className="form-floating mb-3">
                            <input type="text" className='form-control' required id='floating-name' placeholder='Nome'
                                onChange={(e)=>setUrl(e.target.value)}
                            />
                            <label htmlFor="floating-name">Url de orden de pago:</label>
                    </div>
                    <div className="d-grid gap-2">
                        <input type="submit" value="REGISTRAR  PAGO" className='btn btn-dark mt-3 fontz' />
                    </div>
                </form>
                    </div>
                </div> 
                    
                </div>
            </div>
        </div>
    )
}

export default Pagar
