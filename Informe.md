# Informe SOLID (S y O) — Proyecto: Actividad-clases-5-09-2025
---
**INSTITUCIÓN:** Servicio Nacional de Aprendizaje – SENA / Centro de Biotecnología  
**PROGRAMA:** Análisis y Desarrollo de Software  
**APRENDIZ:** Laura Sofia Fonseca Urrea y Esteban Hernandez  
**INSTRUCTOR:** Esteban Hernandez  
**FICHA:** 3203082  
---

## 1. Contexto

Se implementa clases genéricas, pertinentes, con métodos atributos genéricos y utilizando los type normal y 
con unión, con un enfoque en el Principio de Responsabilidad Única (SRP). Este informe es con el propósito 
de identificar si cada clase o tipo tiene una única razón para cambiar y en caso contrario, proponer 
soluciones para mejorar su diseño. Los módulos principales se encuentran en `src/models/`.

En los tipos, hay una relación donde padre es ProductoBase y los hijos son los productos Libro, Ropa, Electrónico. En las clases no hay herencia, pero si se utilizan los genéricos: 
•	ProductoBase: Define las propiedades comunes a todos los productos que son los nombres y los precios.
•	Libro: Tiene ProductoBase con la propiedad autor.
•	Ropa: Tiene ProductoBase con la propiedad talla.
•	Electronico: Tiene ProductoBase con la propiedad marca.


## 2. Inventario de Clases Analizadas

* Clase 1: `src/models/Carrito.ts` — Gestión de productos en el carrito.
* Clase 2: `src/models/GestorArchivos.ts` — Persistencia de información en archivos.

## 3. Análisis por Clase

### 3.1 `src/models/Carrito.ts`

**Responsabilidad declarada:** Administrar la lista de productos del carrito.

**S (Single Responsibility)**

* **Diagnóstico:** ❌ No cumple.
* **Justificación:** La clase muetra los productos y también calcula totales, valida entradas. Tiene varias razones de cambio.
* **Riesgo si se mantiene así:** Tendra dificultad para extender funcionalidades sin dañar otras.

**O (Open/Closed)**

* **Diagnóstico:** ❌ No cumple.
* **Justificación:** El cálculo de precios y manejo de productos está unido a la clase, donde obliga a modificar el código si existente si cambian las reglas de negocio como lo pueden ser los descuentos e impuestos.

**Refactor propuesto (antes → después)**

```ts
// Antes (violando SRP y OCP)
class Carrito {
  private productos: Producto[] = [];

  agregar(producto: Producto) {
    this.productos.push(producto);
  }

  calcularTotal() {
    return this.productos.reduce((acc, p) => acc + p.precio, 0);
  }
}

// Después (responsabilidades separadas y extensible por estrategias)
interface PricingStrategy {
  calcularTotal(productos: Producto[]): number;
}

class DefaultPricing implements PricingStrategy {
  calcularTotal(productos: Producto[]): number {
    return productos.reduce((acc, p) => acc + p.precio, 0);
  }
}

class Carrito {
  constructor(private pricing: PricingStrategy) {}
  private productos: Producto[] = [];

  agregar(producto: Producto) {
    this.productos.push(producto);
  }

  total() {
    return this.pricing.calcularTotal(this.productos);
  }
}
```

---

### 3.2 `src/models/GestorArchivos.ts`

**Responsabilidad declarada:** Manejar la lectura y escritura de datos en archivos.

**S (Single Responsibility)**

* **Diagnóstico:** ❌ No cumple.
* **Justificación:** La clase mezcla la lógica de persistencia con la lógica de negocio osea qué datos se guardan y cómo, donde se podria necesitar cambios tanto por la estructura del archivo como por la lógica del carrito.
* **Riesgo si se mantiene así:** Cambios en formato de almacenamiento obligan a modificar la clase, afectando pruebas y otros módulos.

**O (Open/Closed)**

* **Diagnóstico:** ❌ No cumple.
* **Justificación:** El gestor está acoplado a un formato de archivo. Si se quisiera guardar en JSON, CSV o en una base de datos, habría que modificar directamente la clase.

**Refactor propuesto (antes → después)**

```ts
// Antes (violando SRP y OCP)
class GestorArchivos {
  guardar(productos: Producto[]) {
    // lógica fija para escribir archivo .txt
  }

  leer(): Producto[] {
    // lógica fija para leer archivo .txt
  }
}

// Después (SRP + OCP: separación y extensión por estrategias de persistencia)
interface Persistencia {
  guardar(productos: Producto[]): void;
  leer(): Producto[];
}

class PersistenciaArchivo implements Persistencia {
  guardar(productos: Producto[]) { /* lógica archivo */ }
  leer(): Producto[] { return []; }
}

class PersistenciaJSON implements Persistencia {
  guardar(productos: Producto[]) { /* lógica JSON */ }
  leer(): Producto[] { return []; }
}

class GestorArchivos {
  constructor(private persistencia: Persistencia) {}
  guardar(productos: Producto[]) { this.persistencia.guardar(productos); }
  leer(): Producto[] { return this.persistencia.leer(); }
}
```
