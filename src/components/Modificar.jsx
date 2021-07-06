import React,{useState, useEffect} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {db} from '../config/config'
import './Dashboard.css'
import './codigo.css'

const Modificar = () => {

  const [Show, setshow] = useState([])
  const [modal, setmodal] = useState(false)
  const [ident, setident] = useState('')
  const [ident2, setident2] = useState('')


  const [rbd2, setrbd2] = useState('')
  const [rbd22, setrbd22] = useState('')
  const [modal2, setmodal2] = useState(false)


  //-------------Agregar los datos de Firebase en una array--------------    
      const getData = async()=>{
          await db.collection('clientes').onSnapshot((querySnapshot)=>{
              const datos=[];
              querySnapshot.forEach((doc)=>{
                  datos.push({...doc.data(), id:doc.id})
              })
              setshow(datos)
              
          })
  
      }

useEffect(() => {
  getData()
  
}, [])

const eliminar =()=>{ 
    db.collection('clientes')
    .doc(ident)
    .delete()
    .then(setmodal(false))
    }


//----------------------Buscar--------------------------------------
    const acceso = async(e)=>{
        await db.collection('clientes').orderBy('Codigo','desc').onSnapshot((querySnapshot)=>{
            const datos=[];
            querySnapshot.forEach((doc)=>{
                datos.push({...doc.data(), id:doc.id})
            })
            let filtro=datos.filter(dato=>dato.Codigo.toLowerCase().includes(e.toLowerCase()))
    
            setshow(filtro) 
            console.log(filtro)
               
        })
    }

//--------Modal--------------------------------
const modalstyle ={
    position:'relative',
    top:'5%',
    transform:'translate(0%, 50%)'

}  

const modalstyle2 ={
    position:'relative',
    top: '5%',
    transform:'translate(0%, 50%)'

}  
//---------------Html---------------------
const cerrarModal=()=>{
    setmodal(false)
}
const cerrarModal2=()=>{
    setmodal2(false)
}

const correr2= (e)=>{
    setident2(e)
    setmodal2(true)

}

const correr= (e)=>{
    setident(e)
    setmodal(true)

}


const verificar2 = async()=>{
    await db.collection('passwd').onSnapshot((querySnapshot)=>{
        const datos=[];
        querySnapshot.forEach((doc)=>{
            datos.push({...doc.data(), id:doc.id})
        })
        const rbd=((datos.map(dat=>dat.passwdd))[0])
        if(rbd22===rbd){
            if(ident2 === undefined){
                window.location='/modificar'
            }else{
                window.location='/modify$id='+ident2
            }
        }else{
            const txt=document.getElementById('esteid')
            txt.classList.remove('contra2')
        }
        
        
    })

}


const verificar = async()=>{
    await db.collection('passwd').onSnapshot((querySnapshot)=>{
        const datos=[];
        querySnapshot.forEach((doc)=>{
            datos.push({...doc.data(), id:doc.id})
        })
        const rbd=((datos.map(dat=>dat.passwdd))[0])
        if(rbd2===rbd){
            if(ident === undefined){
                window.location='/modificar'
            }else{
                eliminar()
            }
        }else{
            const txt=document.getElementById('esteid')
            txt.classList.remove('contra2')

        }
        
        
    })

}
//onClick={e=>eliminar(e.target.value)}


    return (
        <div className="container">
          <div className="row">

            <div className="col-md-13">
                <h4 className='text-center text-black-50'>Modificar datos de cliente</h4>
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
                       
    <div className="card">
    <div className="col">
    
        
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
                        Valor total:
                    </td>
                    <td>
                        ${(datos.Total)}
                    </td>
                </tr>
                <tr>
                     <td>
                        Valor pagado:
                    </td>
                    <td>
                        ${(datos.Pagado)}
                    </td>
                </tr>
        </tbody>
        </table>
                <Button value={datos.id} onClick={e=>correr2(e.target.value)} className='btn bt2 border border-secondary form-control'>
                    <b>EDITAR</b> <i className="fas fa-user-edit"></i>  
                </Button>
                            
                <Button className='btn bt3 form-control border border-secondary mt-2' value={datos.id} onClick={e=>correr(e.target.value)}>
                    <b>BORRAR</b> <i className="fas fa-trash"></i>  
                </Button>
         </div>
    </div>

</div>
                    )
                })}
</div>



            </div>
          </div>


          <Modal isOpen={modal2} style={modalstyle2}>
            <ModalHeader>
            Ingrese la contraseña
            </ModalHeader>


            <ModalBody>
            <p className='contra2 contra' id='esteid'> Error: Contraseña incorrecta</p>
    
            <input type="password" id='password' placeholder='Contraseña' className="form-control" onChange={e=>setrbd22(e.target.value)}/>
            </ModalBody>

            <ModalFooter>
            <button className='btn btn-success' onClick={verificar2}>Verificar</button>
            <button className='btn btn-danger' onClick={cerrarModal2}>Cerrar</button>
            </ModalFooter>
      </Modal>




      <Modal isOpen={modal} style={modalstyle}>
            <ModalHeader>
            Ingrese la contraseña
            </ModalHeader>


            <ModalBody>
            <p className='contra2 contra' id='esteid'> Error: Contraseña incorrecta</p>
    
            <input type="password" id='password' placeholder='Contraseña' className="form-control" onChange={e=>setrbd2(e.target.value)}/>
            </ModalBody>

            <ModalFooter>
            <button className='btn btn-success' onClick={verificar}>Verificar</button>
            <button className='btn btn-danger mx-3 px-3' onClick={cerrarModal}>Cerrar</button>
            </ModalFooter>
      </Modal>
      </div>
    )
}

export default Modificar
