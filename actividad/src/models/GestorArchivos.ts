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
