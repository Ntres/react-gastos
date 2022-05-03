import { useState, useEffect } from 'react'

import { Header } from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal.jsx'

import { generarId } from './helpers'

import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] )

  const [gastoEditar, setGastoEditar] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0){
      setModal(true)
      
      setTimeout(() => {
        setAnimarModal(true)
      }, 300);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])
  

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    
    setTimeout(() => {
      setAnimarModal(true)
    }, 300);
  }

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto' ?? 0))
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])
  

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // Actualizamos
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // Nuevo registro
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 300);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
   <div className={modal ? 'fijar' : ''}>
    <Header
      gastos={gastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
    />
    {isValidPresupuesto && (
      <>
        <main>
          <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} />
        </main>
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto} alt="icono-nuevo-gasto"
            onClick={handleNuevoGasto}
          />
        </div>
      </>
    )}

    {modal && <Modal
                setModal={setModal}
                gastoEditar={gastoEditar}
                animarModal={animarModal}
                guardarGasto={guardarGasto}
                setGastoEditar={setGastoEditar}
                setAnimarModal={setAnimarModal}
              />}
   </div>
  )
}

export default App
