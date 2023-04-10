import { ControlPresupuesto } from "./ControlPresupuesto"
import { NuevoPresupuesto } from "./NuevoPresupuesto"

export const Header = ({ 
  gastos,
  setGastos,
  presupuesto, 
  setPresupuesto, 
  isValdidPresupuesto, 
  setIsValdidPresupuesto,
  }) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {
          isValdidPresupuesto? (
          <ControlPresupuesto 
            gastos={ gastos } 
            setGastos = { setGastos }
            presupuesto={ presupuesto }
            setPresupuesto= { setPresupuesto }
            setIsValdidPresupuesto ={ setIsValdidPresupuesto }
          />
            ): (
          <NuevoPresupuesto 
            presupuesto={ presupuesto }
            setPresupuesto={ setPresupuesto }
            setIsValdidPresupuesto={ setIsValdidPresupuesto } 
          />)
        }
    </header>
  )
}
