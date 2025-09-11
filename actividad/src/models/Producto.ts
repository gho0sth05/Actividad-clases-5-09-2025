export type ProductoBase = {
  nombre: string;
  precio: number;
};

export type Libro = ProductoBase & { autor: string };
export type Ropa = ProductoBase & { talla: string };
export type Electronico = ProductoBase & { marca: string };

export type Producto = Libro | Ropa | Electronico;
