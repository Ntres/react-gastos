import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos, presupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setdisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
      const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
      const totalDisponible = presupuesto - totalGastado

      const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2)
      
      setTimeout(() => {
          setPorcentaje(nuevoPorcentaje)
      }, 1500);

      setGastado(totalGastado)
      setdisponible(totalDisponible)
    }, [gastos])
    

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR'
        })
    }

    return ( 
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
     );
}
 
export default ControlPresupuesto;