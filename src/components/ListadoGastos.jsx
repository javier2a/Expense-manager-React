import  Gasto  from "./Gasto"


export const ListadoGastos = ({ 
    gastos, 
    setGastoEditar,
    eliminarGasto,
    filtro, 
    gastosFiltrados 
}) => {

  return (
    <div className="listado-gastos contenedor">   
       

        {   
            
            filtro? (
                <>
                    <h2>{gastosFiltrados.length? 'Gastos': 'No Hay Gastos Aun para Esta Categoria'}</h2>
                    {
                        gastosFiltrados.map( gasto => (
                            <Gasto 
                                gasto ={ gasto }
                                key={ gasto.id } 
                                setGastoEditar={ setGastoEditar }
                                eliminarGasto={ eliminarGasto }
                            />   
                        ))}
                </>
            ):(
                <>
                    <h2>{gastos.length? 'Gastos': 'No Hay Gastos Aun'}</h2>
                    {
                        gastos.map( gasto => (
                            <Gasto 
                                gasto ={ gasto }
                                key={ gasto.id } 
                                setGastoEditar={ setGastoEditar }
                                eliminarGasto={ eliminarGasto }
                            />   
                    ))}
                </>
            )
        }
    </div>
  )
}
