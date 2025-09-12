// Pasa los precios a COP
export const formatearPrecio = (precio: number): string =>
  new Intl.NumberFormat("es-CO").format(precio);
