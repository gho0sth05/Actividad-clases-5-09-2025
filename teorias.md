# Informe SOLID (LSP, ISP, DIP) — Proyecto: Actividad-clases-5-09-2025
---
**INSTITUCIÓN:** Servicio Nacional de Aprendizaje – SENA / Centro de Biotecnología  
**PROGRAMA:** Análisis y Desarrollo de Software  
**APRENDIZ:** Laura Fonseca , Juan Jose Bocanegra, Karen Gonzalez
**INSTRUCTOR:** Esteban Hernandez  
**FICHA:** 3203082  
---
 
##  🔹 Contexto

Este informe analiza la aplicación de los principios SOLID, específicamente liskov substitution principle (LSP), Interface Segregation Principle (ISP) y 
dependency inversion principle (DIP), en el código del proyecto "Actividad-clases-5-09-2025". El objetivo es identificar cómo esos principios estan en 
el codigo o podrían mejorarse en las clases y tipos definidos.

El proyecto utiliza clases genéricas y tipos de unión para manejar diferentes tipos de productos. La estructura de tipos es la siguiente:

*   **`ProductoBase`**: Define las propiedades fundamentales (`nombre`, `precio`) comunes a todos los productos.
*   **`Libro`**: Extiende `ProductoBase` añadiendo la propiedad `autor`.
*   **`Ropa`**: Extiende `ProductoBase` añadiendo la propiedad `talla`.
*   **`Electronico`**: Extiende `ProductoBase` añadiendo la propiedad `marca`.
*   **`Producto`**: Es un tipo de unión (`Libro | Ropa | Electronico`), permitiendo que las funciones trabajen con cualquiera de estos tipos especializados.

## 🔹 Inventario de Clases y Tipos Analizados

*   **Tipo 1:** `src/models/Producto.ts` — Definición de la jerarquía de productos.
*   **Clase 1:** `src/models/Carrito.ts` — Gestión de productos en un carrito de compras.
*   **Clase 2:** `src/models/GestorArchivos.ts` — Manejo genérico de colecciones de elementos.

## 🔹 Análisis por Clase y Tipo

###  `src/models/Producto.ts` (Jerarquía de Tipos)

**L (Liskov Substitution Principle)**

*   **Diagnóstico:** ✅ Cumple.
*   **Justificación:** El principio de Liskov establece que los objetos de una superclase deben poder ser reemplazados por objetos de sus subclases sin alterar la corrección del programa. En TypeScript, esto se aplica a la compatibilidad de tipos. Aquí, `Libro`, `Ropa`, y `Electronico` son subtipos de `Producto` (a través de la unión). Cualquier función o clase que espere un `Producto` puede recibir un `Libro`, `Ropa` o `Electronico` y operar correctamente con las propiedades comunes (`nombre`, `precio`). Las propiedades específicas (`autor`, `talla`, `marca`) son adicionales y no rompen la funcionalidad base.
*   **Riesgo si se mantiene así:** No hay riesgo, el diseño de tipos es robusto para este principio.

**I (Interface Segregation Principle)**

*   **Diagnóstico:** ✅ Cumple.
*   **Justificación:** ISP sugiere que ninguna clase debe ser forzada a implementar interfaces que no usa. En este caso, `ProductoBase` es una interfaz mínima que define lo esencial. Los tipos `Libro`, `Ropa`, y `Electronico` extienden `ProductoBase` y añaden solo las propiedades que les son relevantes. No hay una única "interfaz gorda" que obligue a los productos a tener propiedades que no necesitan. La unión `Producto` es una forma flexible de agrupar estos tipos sin imponer requisitos innecesarios a cada uno.
*   **Riesgo si se mantiene así:** No hay riesgo, la segregación de tipos es adecuada.

**D (Dependency Inversion Principle)**

*   **Diagnóstico:** ✅ Cumple (a nivel de tipos).
*   **Justificación:** DIP establece que los módulos de alto nivel no deben depender de módulos de bajo nivel; ambos deben depender de abstracciones. Además, las abstracciones no deben depender de los detalles; los detalles deben depender de las abstracciones. En `Producto.ts`, `ProductoBase` actúa como una abstracción de alto nivel para todos los productos. Los tipos concretos (`Libro`, `Ropa`, `Electronico`) son los detalles que dependen de esta abstracción. Esto permite que componentes como `Carrito` trabajen con la abstracción `Producto` (la unión de los tipos concretos) sin acoplarse a un tipo de producto específico.
*   **Riesgo si se mantiene así:** No hay riesgo, la inversión de dependencia a nivel de tipos está bien manejada.

---

### 🔹 `src/models/Carrito.ts`

**L (Liskov Substitution Principle)**

*   **Diagnóstico:** ✅ Cumple.
*   **Justificación:** La clase `Carrito` es genérica (`Carrito<T extends Producto>`). Esto significa que puede operar con cualquier tipo `T` que sea un subtipo de `Producto`. Dado que `Libro`, `Ropa`, y `Electronico` son todos subtipos de `Producto`, cualquier instancia de `Carrito` creada con uno de estos tipos específicos (o con la unión `Producto` directamente) funcionará correctamente. El método `agregarProducto` y `calcularTotal` solo acceden a las propiedades `nombre` y `precio`, que están garantizadas por `ProductoBase` (y por ende, por `Producto`).
*   **Riesgo si se mantiene así:** No hay riesgo. La genericidad con la restricción `extends Producto` asegura la compatibilidad Liskov.

**I (Interface Segregation Principle)**

*   **Diagnóstico:** ✅ Cumple.
*   **Justificación:** La clase `Carrito` tiene una responsabilidad clara: gestionar una colección de productos. Sus métodos (`agregarProducto`, `verProductos`, `calcularTotal`) están directamente relacionados con esta única responsabilidad. No expone ni requiere funcionalidades que no le son propias. Los consumidores de `Carrito` solo interactúan con los métodos que necesitan para la gestión del carrito.
*   **Riesgo si se mantiene así:** No hay riesgo. La interfaz pública de `Carrito` es cohesiva y bien segregada.

**D (Dependency Inversion Principle)**

*   **Diagnóstico:** ✅ Cumple.
*   **Justificación:** La clase `Carrito` (módulo de alto nivel) depende de la abstracción `Producto` (a través de su parámetro genérico `T extends Producto`), no de los tipos concretos `Libro`, `Ropa` o `Electronico`. Esto significa que `Carrito` no necesita saber los detalles específicos de cada tipo de producto, solo que tienen un `nombre` y un `precio`. Si se añaden nuevos tipos de productos (e.g., `Servicio`, `Digital`), `Carrito` no necesitará modificarse, siempre y cuando estos nuevos tipos extiendan `ProductoBase` y sean parte de la unión `Producto`.
*   **Riesgo si se mantiene así:** No hay riesgo. La dependencia está invertida hacia la abstracción `Producto`.

---

### 🔹 `src/models/GestorArchivos.ts`

**L (Liskov Substitution Principle)**

*   **Diagnóstico:** ✅ Cumple.
*   **Justificación:** La clase `GestorArchivos` es genérica (`GestorArchivos<T>`). Esto significa que puede manejar cualquier tipo `T` sin imponer restricciones sobre sus propiedades o comportamiento. Si se usa con diferentes tipos (e.g., `GestorArchivos<Producto>`, `GestorArchivos<string>`, `GestorArchivos<number>`), las operaciones `agregar` y `listar` funcionarán de la misma manera para todos, ya que solo manipulan los elementos como un arreglo genérico. No hay un comportamiento polimórfico que pueda ser violado por subtipos, ya que no hay una jerarquía de clases explícita dentro del `GestorArchivos` en sí.
*   **Riesgo si se mantiene así:** No hay riesgo. El diseño genérico es compatible con LSP.

**I (Interface Segregation Principle)**

*   **Diagnóstico:** ✅ Cumple.
*   **Justificación:** `GestorArchivos` tiene una interfaz muy simple y específica: `agregar(elemento: T)` y `listar(): T[]`. Estas dos operaciones son las únicas responsabilidades declaradas para un "gestor de archivos" genérico que almacena elementos en memoria. No obliga a sus consumidores a depender de métodos que no necesitan.
*   **Riesgo si se mantiene así:** No hay riesgo. La interfaz es mínima y bien segregada.

**D (Dependency Inversion Principle)**

*   **Diagnóstico:** ✅ Cumple.
*   **Justificación:** `GestorArchivos` es un módulo de alto nivel que gestiona una colección de elementos. No depende de los detalles de los elementos que almacena (`T`). En cambio, depende de la abstracción de "cualquier tipo `T`". Esto permite que `GestorArchivos` sea reutilizable con una amplia variedad de datos sin acoplarse a sus implementaciones concretas. Los "detalles" (los tipos específicos de `T`) dependen de la abstracción genérica que `GestorArchivos` proporciona.
*   **Riesgo si se mantiene así:** No hay riesgo. La inversión de dependencia se logra a través de la genericidad.

---

## 🔹 Conclusiones 

El diseño actual del proyecto demuestra una buena comprensión y aplicación de los principios SOLID, especialmente Liskov Substitution Principle, Interface Segregation Principle y Dependency Inversion Principle.

*   **LSP** se cumple gracias al uso de tipos de unión y la genericidad con restricciones, asegurando que los subtipos puedan ser usados donde se esperan los tipos base sin romper la funcionalidad.
*   **ISP** se observa en la definición de tipos y clases con interfaces cohesivas y mínimas, evitando que los componentes dependan de funcionalidades que no utilizan.
*   **DIP** se aplica eficazmente mediante la dependencia de abstracciones (tipos de unión, parámetros genéricos) en lugar de implementaciones concretas, lo que promueve la flexibilidad y la extensibilidad del código.

El uso de tipos de unión para `Producto` y clases genéricas como `Carrito` y `GestorArchivos` son ejemplos claros de cómo estos principios se han integrado para crear un sistema modular y fácil de mantener.
