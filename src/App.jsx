import React from 'react'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Clientes from './components/Clientes'
import Modificar from './components/Modificar'
import Registrar from './components/Registrar'
import Modi from './components/Modi'
import Pagar from './components/Pagar'
import Historial from './components/Historial'
import Navbar from './components/Navbar'
const App = () => {
  
  return (

    <Router>
    <Navbar/>
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/clientes' component={Clientes}/>
        <Route path='/modificar' component={Modificar}/>
        <Route path='/registrar' component={Registrar}/>
        <Route path='/modify$id=:identy' component = {Modi}/>
        <Route path='/pago$id=:identificador&:nombre&:apellido&:total&:pagado=:cedula' component = {Pagar}/>
        <Route path='/Historial' component = {Historial}/>
      </Switch>
    </Router>

  )
}

export default App
