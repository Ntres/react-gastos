import Gasto from './Gasto.jsx'

const ListadoGastos = ({gastos, filtro, setGastoEditar, eliminarGasto, gastosFiltrados}) => {
    return ( 
        <div className="listado-gastos contenedor">
            {
                filtro ? (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos'}</h2>
                        {gastosFiltrados.map(gasto => (
                            <Gasto
                                gasto={gasto}
                                key={gasto.id}
                                eliminarGasto={eliminarGasto}
                                setGastoEditar={setGastoEditar}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>
                        {gastos.map(gasto => (
                            <Gasto
                                gasto={gasto}
                                key={gasto.id}
                                eliminarGasto={eliminarGasto}
                                setGastoEditar={setGastoEditar}
                                />
                        ))}
                    </>
                )
            }
        </div>
     );
}
 
export default ListadoGastos;