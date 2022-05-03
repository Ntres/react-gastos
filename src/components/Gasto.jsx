import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list';
import "react-swipeable-list/dist/styles.css"

import { formatearFecha } from "../helpers"

import IconoAhorro from '../img/Icono_ahorro.svg'
import IconoCasa from '../img/Icono_casa.svg'
import IconoComida from '../img/Icono_comida.svg'
import IconoGastos from '../img/Icono_gastos.svg'
import IconoOcio from '../img/Icono_ocio.svg'
import IconoSalud from '../img/Icono_salud.svg'
import IconoSuscripciones from '../img/Icono_suscripciones.svg'

const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoCasa,
    casa: IconoComida,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}


const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => {
                setGastoEditar(gasto)
            }}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction destructive={true} onClick={() => {
                eliminarGasto(gasto.id)
            }}>
                Borrar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={diccionarioIconos[gasto.categoria]} alt="icono_gasto" />
                        <div className="descripcion-gasto">
                            <p className="categoria">{gasto.categoria}</p>
                            <p className="nombre-gasto">{gasto.nombre}</p>
                            <p className="fecha-gasto">Agregado el: <span>{formatearFecha(gasto.fecha)}</span></p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">{gasto.cantidad}€</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
     );
}
 
export default Gasto;