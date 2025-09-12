// Clase genérica GestorArchivos q maneja una lista de elementos de tipo T.
// Permite agregar elementos y listar todos los elementos almacenados
// Cada instancia tiene un nombre q los identifica
export class GestorArchivos<T> {
  private elementos: T[] = [];
  constructor(public nombre: string) {}

  agregar(elemento: T): void {
    this.elementos.push(elemento);
  }

  listar(): T[] {
    return this.elementos;
  }
}
