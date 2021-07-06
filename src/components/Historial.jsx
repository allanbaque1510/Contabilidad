import React,{useState,useEffect} from 'react'

import {db} from '../config/config'
import {SRLWrapper} from 'simple-react-lightbox'
import './Dashboard.css'

const Historial = () => {

const [Show, setshow] = useState([])

//-------------Agregar los datos de Firebase en una array--------------    
const getData = async()=>{
    await db.collection('Historial2').orderBy('Fecha','desc').onSnapshot((querySnapshot)=>{
        const datos=[];
        querySnapshot.forEach((doc)=>{
            datos.push({...doc.data(), id:doc.id})
        })
        setshow(datos)
        
    })

}


//-----------------------Buscar por parametros------------------
const acceso = async(e)=>{
    await db.collection('Historial2').onSnapshot((querySnapshot)=>{
        const datos=[];
        querySnapshot.forEach((doc)=>{
            datos.push({...doc.data(), id:doc.id})
        })
        let filtro=datos.filter(dato=>dato.Codigo.toLowerCase().includes(e.toLowerCase()))

        setshow(filtro) 
        console.log(filtro)
           
    })
}


//------------USe Effect para obtener los datos cuando carga la pagina------
useEffect(() => {
    getData()
}, [])


    return (
        <div className="container">
            <div className="row">
 
                <div className="col-md-13 todo">
                <h3 className='text-center text-black-50'>Historial de pagos</h3>
                <hr />
                <br />
                <div className="form-floating mb-3">
                        <input type="text" className='form-control' maxLength='5' required id='floating-name' placeholder='Nome'
                            onChange={e=>acceso(e.target.value)}
                        />
                        <label htmlFor="floating-name"> <i> Buscar cliente por codigo:</i></label>
                    </div>



            <div className="row row-cols-1 row-cols-md-3 g-4">
                
                            {Show.map(datos=>{
                                return(
                                   
                <div className="col">
                <div className="card">
                
                        <SRLWrapper>
                        <a href={datos.Url}>
                            <img src={datos.Url} className='imagenH'/>
                        </a>
                        </SRLWrapper>
                     <div className="card-body">
                     <table className="table table-hover">
                     <thead>
                            <tr>
                                <td colspan='2' className='text-center'>
                                    <p>{datos.Codigo}</p>
                                </td>
                                
                                
                                
                            </tr>
                    </thead>

                    <tbody>
                            <tr>
                                 <td>
                                    Cedula:
                                </td>
                                <td>
                                    {datos.Cedula}
                                </td>
                            </tr>
                            <tr>
                                 <td>
                                    Nombre:
                                </td>
                                <td>
                                    {datos.Nombre}
                                </td>
                            </tr>
                            <tr>
                                 <td>
                                    Apellido:
                                </td>
                                <td>
                                    {datos.Apellido}
                                </td>
                            </tr>
                            <tr>
                                 <td>
                                    Monto:
                                </td>
                                <td>
                                    ${(datos.Pagado).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                 <td>
                                    Fecha:
                                </td>
                                <td>
                                    {datos.Fecha}
                                </td>
                            </tr>
                            <tr>
                                 <td>
                                    Hora:
                                </td>
                                <td>
                                    {datos.Hora}
                                </td>
                            </tr>
            
                    </tbody>
                    </table>
                     </div>
                </div>

            </div>
                                )
                            })}
            </div>

                </div>
            </div>
        
        </div>
    )
}

export default Historial
