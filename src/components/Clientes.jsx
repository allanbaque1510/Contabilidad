import React,{useState, useEffect} from 'react'

import {db} from '../config/config'
import {Link} from 'react-router-dom'
import './Dashboard.css'
const Clientes = () => {

    const [Show, setshow] = useState([])


//-------------Agregar los datos de Firebase en una array--------------    
    const getData = async()=>{
        await db.collection('clientes').orderBy('Codigo','desc').onSnapshot((querySnapshot)=>{
            const datos=[];
            querySnapshot.forEach((doc)=>{
                datos.push({...doc.data(), id:doc.id})
            })
            setshow(datos)
            
        })

    }
    
   
const acceso = async(e)=>{
    await db.collection('clientes').onSnapshot((querySnapshot)=>{
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

            <div className="col-md-13">
            <h4 className='text-center text-black-50 hola'>Datos de clientes</h4>
            <br />

                    <div className="form-floating mb-3 tarjeta">
                        <input type="text" className='form-control' maxLength='5' required id='floating-name' placeholder='Nome'
                            onChange={e=>acceso(e.target.value)}
                        />
                        <label htmlFor="floating-name"> <i> Buscar cliente por codigo:</i></label>
                    </div>




                    <div className="row row-cols-1 row-cols-md-3 g-4">
                
                {Show.map(datos=>{
                    return(
                       
    <div className="col">
    <div className="card tarjeta">
    
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
                        Telefono:
                    </td>
                    <td>
                        {datos.Telefono}
                    </td>
                </tr>

                <tr>
                     <td>
                        Local:
                    </td>
                    <td>
                        {datos.Local}
                    </td>
                </tr>

                <tr>
                     <td>
                        Direccion:
                    </td>
                    <td>
                        {datos.Direccion}
                    </td>
                </tr>

                <tr>
                     <td>
                        Total:
                    </td>
                    <td>
                    ${(datos.Total).toFixed(2)}
                    </td>
                </tr>
                <tr>
                     <td>
                        Pagado:
                    </td>
                    <td>
                        ${(datos.Pagado).toFixed(2)}
                    </td>
                </tr>
                <tr>
                     <td>
                        Deuda:
                    </td>
                    <td>
                    ${(datos.Total - datos.Pagado).toFixed(2)}
                    </td>
                </tr>

        </tbody>
        </table>
        
           <Link className='btn btn-dark px-3 form-control cobrar' to={'/pago$id='+datos.id+'&'+datos.Nombre+'&'+datos.Apellido+'&'+datos.Total+'&'+datos.Pagado+'='+datos.Cedula}>
                                       COBRAR DEUDA &nbsp; <i className="fas fa-money-check-alt font-size-1"></i>
            </Link>
           
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

export default Clientes
