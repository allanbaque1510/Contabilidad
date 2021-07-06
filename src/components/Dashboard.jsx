import React,{useState,useEffect} from 'react'

import {db} from '../config/config'
import {Bar} from 'react-chartjs-2'
import './Dashboard.css'

const Dashboard = () => {
    
    const [Show, setshow] = useState([])


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

//--------------Constante de los totales para dashboard---------------------------    
const total = (Show.reduce((sum,valor)=>(typeof valor.Total == 'number'? sum + valor.Total : sum),0)).toFixed(2)
const pagado = (Show.reduce((sum,valor)=>(typeof valor.Pagado == 'number'? sum + valor.Pagado : sum),0)).toFixed(2)
const deuda = (total - pagado).toFixed(2)

//-----------------------------Grafica de barras------------------------------
const data ={
    labels:['1', '2','3'],
    datasets:[{
        label:'Grafica de control',
        backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(54, 162, 235, 0.4)','rgba(255, 99, 132, 0.4)'],
        borderColor:['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)','rgba(255, 99, 132, 1)'],
        borderWidth:1,
        data:[total,pagado,deuda]
    }]
}
const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'none',
      },
      title: {
        display: true,
        text: 'Grafica de control "relacion: Total /Pagado/ Deuda"',
      },
    },
  };
  
//-------------UseEffect para ejecutar la funcion al cargar la pagina-----------
useEffect(() => {
    getData()
    
}, [])    

    return (
      <div className="container">
      
          <div className="row">
          

              <h3 className='hola2 text-black-50'>Estadistica de ingresos</h3>
                <div className="grafica">
                    <Bar data={data} options={options}/>                
                </div>
            
                <table className="table table-bordered border-light text-center tablaas">
                  <thead>
                    <tr>
                      <th className="verd"> Valor Total:</th>
                      <th className="az"> Ingresos cobrados:</th>
                      <th className="rd"> Deuda Total:</th>
                    </tr>
                  </thead>
                  <tr>
                    <td className="verd2">{total}</td>
                    <td className="az2">{pagado}</td>
                    <td className="rd2">{deuda}</td>
                  </tr>
                </table>
   
          

            </div>
          </div>

    )
}

export default Dashboard
