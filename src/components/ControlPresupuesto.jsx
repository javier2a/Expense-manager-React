import { useEffect, useState } from "react"
import { formatearPresupuesto } from "../helpers/formatearDinero"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'


export const ControlPresupuesto = ({ 
    gastos, 
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValdidPresupuesto,
    }) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    
    

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado
        
        const nuevoPorcentaje = ( ((presupuesto - totalDisponible) / presupuesto) *100 ).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGastado)
        
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
        
    }, [gastos])
    
    const handdleResetButton = ()=> {
        const resultado = confirm('Deseas reiniciar presupuesto y gastos?')
        if( resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValdidPresupuesto(false)
        }else{
            return
        }
    }

    

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            {<CircularProgressbar 
                styles={
                    buildStyles({
                        pathColor: porcentaje >100? '#DC2626': '#3B82F6',
                        trailColor: '#f5f5f5',
                        textColor:  porcentaje >100? '#DC2626': '#3B82F6'
                    })
                }
                value={porcentaje} 
                text={`${porcentaje}% Gastado`} 

            />}
        </div>
        <div className="contenido-presupuesto">
            <button className="reset-app" type="button" onClick={ handdleResetButton }>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
            </p>
            <p className={`${disponible < 0? 'negativo':''}`}>
                <span>Disponible: </span> {formatearPresupuesto(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearPresupuesto(gastado)}
            </p>
        </div>
    </div>
  )
}
