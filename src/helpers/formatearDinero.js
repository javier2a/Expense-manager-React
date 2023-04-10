export const formatearPresupuesto = (cantidad) => cantidad.toLocaleString('en-Us', {
    style: 'currency',
    currency: 'USD'
})