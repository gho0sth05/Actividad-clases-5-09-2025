# Informe SOLID (S y O) — Proyecto: Actividad-clases-5-09-2025
---
**INSTITUCIÓN:** Servicio Nacional de Aprendizaje – SENA / Centro de Biotecnología  
**PROGRAMA:** Análisis y Desarrollo de Software  
**APRENDIZ:** Laura Sofia Fonseca Urrea y Esteban Hernandez  
**INSTRUCTOR:** Esteban Hernandez  
**FICHA:** 3203082  
---

## 1. Contexto

El presente informe analiza la aplicación de los principios **SOLID** (en particular, **S: Single Responsibility** y **O: Open/Closed**) en las clases del proyecto **Actividad-clases-5-09-2025**.  
El propósito es identificar responsabilidades mal definidas o violaciones a la extensibilidad, y proponer refactors que hagan el código más mantenible y adaptable a cambios futuros.  

En el proyecto se implementan **clases genéricas** con atributos y métodos comunes, además de **tipos con unión** para representar distintos productos. Los módulos principales se encuentran en `src/models/`.  

En los tipos, hay una relación donde padre es **ProductoBase** y los hijos son los productos:  
- **Libro:** hereda de ProductoBase e incluye la propiedad `autor`.  
- **Ropa:** hereda de ProductoBase e incluye la propiedad `talla`.  
- **Electrónico:** hereda de ProductoBase e incluye la propiedad `marca`.  

De esta forma, se busca reutilización de código y consistencia en el modelado.  

## 2. Inventario de Clases Analizadas

* Clase 1: `src/models/Carrito.ts` — Gestión de productos en el carrito.  
* Clase 2: `src/models/GestorArchivos.ts` — Persistencia de información en archivos.  
s
