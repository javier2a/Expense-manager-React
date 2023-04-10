import React, {  useEffect, useState } from "react"
import { Header } from "./components/Header"
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { Modal } from "./components/Modal"
import { randomId } from "./helpers/ramdomId"
import { ListadoGastos } from "./components/ListadoGastos"
import { Filtros } from "./components/Filtros"
export const App = () => {
  
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')? JSON.parse(localStorage.getItem('gastos')):[]
  )
  
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto'))?? 0
  )
  const [isValdidPresupuesto, setIsValdidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState({})
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])
  

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos)?? [])
  }, [gastos])
  
  useEffect( () => {
    const presupuestoLS = localStorage.getItem('presupuesto')?? 0
   
    if(presupuestoLS > 0){
      setIsValdidPresupuesto(true)
    }

  },[])
  useEffect(() => {
    if( filtro) {
      const newGastosfiltrados = gastos.filter( gasto =>  gasto.categoria === filtro)
      setGastosFiltrados(newGastosfiltrados);
    }
  }, [filtro])
  

  const handdleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setFiltro('')

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = (gasto) => {
    if(gasto.id){
      const gastosActualizados = gastos.map( gastoState => (gastoState.id === gasto.id)? gasto:gastoState )
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id= randomId()
      gasto.date= Date.now()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500);
    
  }

  const eliminarGasto = ( id ) =>{
    const gastosActualizados = gastos.filter( gastoState => (gastoState.id !== id))
    setGastos(gastosActualizados)
    
  }
  return (
    <div className={ modal? 'fijar':''}>
      <Header 
        gastos={ gastos }
        setGastos = { setGastos }
        presupuesto={ presupuesto } 
        setPresupuesto={ setPresupuesto }
        isValdidPresupuesto= { isValdidPresupuesto }
        setIsValdidPresupuesto = { setIsValdidPresupuesto }
      />
      

      {
        isValdidPresupuesto && (
          <>
            <main>
              <Filtros filtro={ filtro } setFiltro={ setFiltro }/>
              <ListadoGastos 
                gastos={ gastos } 
                setGastoEditar={ setGastoEditar } 
                eliminarGasto= { eliminarGasto } 
                filtro = { filtro }
                gastosFiltrados= { gastosFiltrados }
              />
            </main>
            <div className="nuevo-gasto">
            <img
              src={ IconoNuevoGasto }
              alt="Icono Nuevo Gasto"
              onClick={ handdleNuevoGasto }
            />
          </div>
          </>
        )
      }
      {
        modal && (<Modal 
                  setModal={ setModal } 
                  animarModal= { animarModal } 
                  setAnimarModal={ setAnimarModal }
                  guardarGasto = { guardarGasto }
                  gastoEditar = { gastoEditar }
                  setGastoEditar = { setGastoEditar }
                  />)
      }
    </div>
      
  )
}
