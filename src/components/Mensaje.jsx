

export const Mensaje = ({ children, type }) => {
  return (
    <div className={`alerta ${type}`}>
        {children}
    </div>
  )
}
