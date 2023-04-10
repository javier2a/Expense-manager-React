import { useEffect, useState } from 'react'
import IconoCerrarModal from '../img/cerrar.svg'
import { Mensaje } from './Mensaje'

export const Modal = ({ 
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto,
    gastoEditar,
    setGastoEditar,
}) => {


    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] =useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setDate(gastoEditar.date)
          }
    }, [])
    

    const handdleCerrarModal = () =>{
        
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500);
        setGastoEditar({})
    }

    const handdleSubmit = ( event ) => {
        event.preventDefault()

        if([nombre, cantidad, categoria ].includes('')){
            setMensaje('Todos los Campos son Obligatorios');

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }

        guardarGasto({nombre, cantidad, categoria, id, date })
        // console.log({nombre, cantidad, categoria, id, date })
    }

  return (
    <div className="modal">
        
        <p>Desde Modal</p>
        <div className="cerrar-modal">
            <img src={IconoCerrarModal} alt="Icono cerrar Modal" onClick={ handdleCerrarModal } />
        </div>
        <form 
            className={`formulario ${animarModal? 'animar':'cerrar'}`} 
            onSubmit={ handdleSubmit } >
            <legend>{ gastoEditar.nombre? 'Editar Gasto':'Nuevo Gasto'}</legend>
            {
                mensaje && (<Mensaje  type={'error'}>{ mensaje }</Mensaje>)
            }
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input
                    id='nombre'
                    type='text'
                    placeholder='Añade el Nombre del Gasto'
                    value={ nombre }
                    onChange={ event => setNombre(event.target.value) }
                />
            </div>

            <div className="campo">
                <label htmlFor="nombre">Cantidad</label>
                <input
                    id='cantidad'
                    type='text'
                    placeholder='Añade la Cantidad del Gasto ej. 300'
                    value={ cantidad }
                    onChange={ event => setCantidad( Number(event.target.value) )}
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select
                    id='categoria'
                    value={ categoria }
                    onChange={ event => setCategoria( event.target.value )}
                >
                    <option value=''>-- Seleccione --</option> 
                    <option value='ahorro'>Ahorro</option> 
                    <option value='comida'>Comida</option> 
                    <option value='casa'>Casa</option> 
                    <option value='gastos'>Gastos Varios</option> 
                    <option value='ocio'>Ocio</option> 
                    <option value='salud'>Salud</option> 
                    <option value='suscripciones'>Suscripciones</option> 
                </select>
               
            </div>
            <input type="submit" value={ gastoEditar.nombre? 'Editar Gasto':'Nuevo Gasto'}  />
        </form>
    </div>
  )
}
