// Define tipos base y específicos para los productos con nombre y precio
// Tipos especializados Libro, Ropa y Electronico q extienden ProductoBase con propiedades 
// Producto es un tipo unión q puede ser cualquiera de los tres tipos especializados.
export type ProductoBase = {
  nombre: string;
  precio: number;
};

export type Libro = ProductoBase & { autor: string };
export type Ropa = ProductoBase & { talla: string };
export type Electronico = ProductoBase & { marca: string };

export type Producto = Libro | Ropa | Electronico;
