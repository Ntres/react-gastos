import { useState, useEffect } from 'react'
import Mensaje from './Mensaje.jsx'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    }, [])
    

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        
        setTimeout(() => {
            setModal(false)
        }, 300);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }

        guardarGasto({nombre, cantidad, categoria, fecha, id})
    }

    return ( 
        <div className="modal">
            <div className="cerrar-modal">
                <img src={CerrarBtn} alt="boton-cerrar" onClick={ocultarModal}/>
            </div>
            <form className={`formulario ${animarModal ? "animar" : "cerrar"}`} onSubmit={handleSubmit} >
                <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e)=> setNombre(e.target.value)}
                        placeholder='A??ade el nombre del gasto...'
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        value={cantidad}
                        onChange={(e)=> setCantidad(Number(e.target.value))}
                        placeholder='A??ade la cantidad del gasto: ej. 300'
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categor??a</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value=""> -- Seleccione -- </option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre ? "Guardar cambios" : "A??adir gasto"} />
            </form>
        </div>
     );
}
 
export default Modal;