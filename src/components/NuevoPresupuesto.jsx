import { useState } from "react";
import { Mensaje } from "./Mensaje";


export const NuevoPresupuesto = ( {presupuesto, setPresupuesto, setIsValdidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('')
    
    const handdlePresupuesto = (event) => {
        event.preventDefault()
        if( !Number(presupuesto) || Number(presupuesto) <= 0 ){
            setMensaje('No es un presupuesto Valido')
            return
        }
        setMensaje('')
        setIsValdidPresupuesto(true)
    }



  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form className="formulario" onSubmit={ handdlePresupuesto }>
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>
                <input onChange={ (event) => setPresupuesto(Number(event.target.value))} type="number" className="nuevo-presupuesto"  placeholder="Añade tu presupuesto" value={ presupuesto
                }/>
            </div>
            <input type="submit" value='añdir' />
            { mensaje && <Mensaje type={'error'}>{mensaje}</Mensaje> }
        </form>
    </div>
  )
}
