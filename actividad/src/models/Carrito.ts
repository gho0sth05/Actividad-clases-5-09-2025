import { Producto } from "./Producto";

export class Carrito<T extends Producto> {
  private productos: T[] = [];
  constructor(public id: number) {}

  agregarProducto(producto: T): void {
    this.productos.push(producto);
  }

  verProductos(): T[] {
    return this.productos;
  }

  calcularTotal(): number {
    return this.productos.reduce((acc, p) => acc + p.precio, 0);
  }
}
