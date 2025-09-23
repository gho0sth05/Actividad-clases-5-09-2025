# Informe SOLID (LSP, ISP, DIP) — Proyecto: Actividad-clases-5-09-2025
---
**INSTITUCIÓN:** Servicio Nacional de Aprendizaje – SENA / Centro de Biotecnología  
**PROGRAMA:** Análisis y Desarrollo de Software  
**APRENDIZ:** Laura Fonseca , Juan Jose Bocanegra, Karen Gonzalez
**INSTRUCTOR:** Esteban Hernandez  
**FICHA:** 3203082  
---


## 1️ Contexto  
Este informe analiza la aplicación de los principios **SOLID**:  

- **Liskov Substitution Principle (LSP)**  
- **Interface Segregation Principle (ISP)**  
- **Dependency Inversion Principle (DIP)**  

en el código del proyecto **“Actividad-clases-5-09-2025”**.  

El proyecto implementa clases genéricas y tipos de unión en TypeScript para manejar diferentes tipos de productos.  

**Jerarquía de tipos:**  
- `ProductoBase`: propiedades comunes (`nombre`, `precio`).  
- `Libro`: añade `autor`.  
- `Ropa`: añade `talla`.  
- `Electronico`: añade `marca`.  
- `Producto`: unión de (`Libro | Ropa | Electronico`).  

---

## 2️ Inventario de Clases/Interfaces Analizadas  
- **Tipo 1:** `src/models/Producto.ts` — Jerarquía de productos.  
- **Clase 1:** `src/models/Carrito.ts` — Gestión de productos en un carrito de compras.  
- **Clase 2:** `src/models/GestorArchivos.ts` — Manejo genérico de colecciones de elementos.  

---

## 3️ Análisis por Clase/Interfaz  

###  3.1 `src/models/Producto.ts`  
**Rol:** Definición de la jerarquía de productos mediante unión de tipos.  

- **L (Liskov Substitution)**  
  - ✅ **Cumple**  
  - Los subtipos (`Libro`, `Ropa`, `Electronico`) pueden usarse donde se espera un `Producto` sin romper la funcionalidad.  

- **I (Interface Segregation)**  
  - ✅ **Cumple**  
  - Cada tipo define solo sus propiedades, sin interfaces innecesarias.  

- **D (Dependency Inversion)**  
  - ✅ **Cumple**  
  - `ProductoBase` funciona como abstracción; los tipos concretos dependen de ella.  

---

###  3.2 `src/models/Carrito.ts`  
**Rol:** Clase genérica para gestión de productos en un carrito.  

- **L (Liskov Substitution)**  
  - ✅ **Cumple**  
  - `Carrito<T extends Producto>` admite cualquier subtipo de `Producto`.  

- **I (Interface Segregation)**  
  - ✅ **Cumple**  
  - Sus métodos (`agregarProducto`, `verProductos`, `calcularTotal`) son específicos y coherentes.  

- **D (Dependency Inversion)**  
  - ✅ **Cumple**  
  - Depende de la abstracción `Producto` y no de implementaciones concretas.  

---

###  3.3 `src/models/GestorArchivos.ts`  
**Rol:** Clase genérica para manejo de colecciones en memoria.  

- **L (Liskov Substitution)**  
  - ✅ **Cumple**  
  - Funciona con cualquier tipo `T` sin romper comportamiento esperado.  

- **I (Interface Segregation)**  
  - ✅ **Cumple**  
  - Define solo lo esencial: `agregar` y `listar`.  

- **D (Dependency Inversion)**  
  - ✅ **Cumple**  
  - Depende de la abstracción genérica `T`.  

---

##  Conclusiones  
El diseño actual del proyecto aplica correctamente los principios **LSP, ISP y DIP**:  

- **LSP:** Subtipos pueden sustituir al tipo base sin romper la funcionalidad.  
- **ISP:** Interfaces y tipos son mínimos y específicos, evitando dependencias innecesarias.  
- **DIP:** Clases como `Carrito` y `GestorArchivos` dependen de abstracciones (`Producto`, genéricos `T`), no de implementaciones concretas.  

👉 Esto asegura un sistema **modular, flexible y fácil de mantener**, preparado para crecer sin romper el diseño existente.  
