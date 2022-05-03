import Gasto from './Gasto.jsx'

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto}) => {
    return ( 
        <div className="listado-gastos contenedor">
            <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>

            {gastos.map(gasto => (
                <Gasto
                    gasto={gasto}
                    key={gasto.id}
                    eliminarGasto={eliminarGasto}
                    setGastoEditar={setGastoEditar}
                />
            ))}
        </div>
     );
}
 
export default ListadoGastos;