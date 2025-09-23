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

en el proyecto **“Actividad-clases-5-09-2025”**, desarrollado en TypeScript.  

El sistema implementa un **modelo de productos** con clases genéricas y tipos de unión, además de un **carrito de compras** y un **gestor de archivos**.  

---

## 2️ Inventario de Clases/Interfaces Analizadas  

- **Tipo 1:** `src/models/Producto.ts` — Jerarquía de productos.  
- **Clase 1:** `src/models/Carrito.ts` — Gestión de productos en un carrito de compras.  
- **Clase 2:** `src/models/GestorArchivos.ts` — Manejo genérico de colecciones de elementos.  

---

## 3️ Análisis por Clase/Interfaz  

### 3.1 `src/models/Producto.ts`  
**Rol:** Definición de la jerarquía de productos mediante unión de tipos.  

- **L (Liskov Substitution)**  
  - ✅ Cumple.  
  - `Libro`, `Ropa` y `Electronico` pueden usarse donde se espera un `Producto` sin romper la funcionalidad.  

- **I (Interface Segregation)**  
  - ✅ Cumple.  
  - Cada tipo define solo lo necesario, sin propiedades irrelevantes.  

- **D (Dependency Inversion)**  
  - ✅ Cumple.  
  - `ProductoBase` funciona como abstracción; los tipos concretos dependen de ella.  

---

###  3.2 `src/models/Carrito.ts`  
**Rol:** Clase genérica para gestión de productos en un carrito.  

- **L (Liskov Substitution)**  
  - ✅ Cumple.  
  - `Carrito<T extends Producto>` admite cualquier subtipo (`Libro`, `Ropa`, `Electronico`).  

- **I (Interface Segregation)**  
  - ✅ Cumple.  
  - Sus métodos (`agregarProducto`, `verProductos`, `calcularTotal`) son claros y específicos.  

- **D (Dependency Inversion)**  
  - ✅ Cumple.  
  - Depende de la abstracción `Producto`, no de implementaciones concretas.  

---

###  3.3 `src/models/GestorArchivos.ts`  
**Rol:** Clase genérica para manejo de colecciones en memoria.  

- **L (Liskov Substitution)**  
  - ✅ Cumple.  
  - Funciona con cualquier tipo `T` sin romper comportamiento esperado.  

- **I (Interface Segregation)**  
  - ✅ Cumple.  
  - Define solo lo esencial: `agregar` y `listar`.  

- **D (Dependency Inversion)**  
  - ✅ Cumple.  
  - Depende de la abstracción genérica `T`.  

---

## 4️ Conclusiones Generales  

- **LSP:** Se cumple en todas las clases y tipos, ya que los subtipos pueden sustituir a sus padres sin romper la funcionalidad.  
- **ISP:** Se cumple porque las interfaces y clases son específicas, sin obligar a implementar métodos o propiedades irrelevantes.  
- **DIP:** Se cumple porque `Carrito` y `GestorArchivos` dependen de abstracciones (tipos, genéricos) en lugar de implementaciones concretas.  





