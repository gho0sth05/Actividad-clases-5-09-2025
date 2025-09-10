# INTERSECCIÓN DE TIPOS EN TYPESCRIPTen TypeScript
Con mi grupo de trabajo Karen Gonzalez, Laura Fonseca , Juan Bocanegra 
---

## 1️⃣ ¿Qué es?
La intersección de tipos permite combinar dos o más tipos en uno solo.
Un valor de un tipo intersección debe cumplir todas las condiciones de los tipos combinados.
```bash
Se representa con el símbolo &.
```

# 2️⃣ ¿Cómo funciona?
Se crean varios tipos por separado, por ejemplo:
```bash
type Persona = { nombre: string };
type Empleado = { salario: number };
Luego se combinan usando &:
type EmpleadoCompleto = Persona & Empleado;
```
Ahora, EmpleadoCompleto tiene todas las propiedades de Persona y Empleado.
Si intentas crear un objeto que no tenga todas las propiedades, TypeScript dará error:
```bash
const juan: EmpleadoCompleto = { nombre: "Juan" }; 
```
Error: Falta la propiedad 'salario'

# 3️⃣ ¿Para qué sirve?
Permite reutilizar tipos y combinarlos según la necesidad del programa.
Aumenta la seguridad de tipos, porque TypeScript asegura que los objetos cumplan todas las propiedades necesarias.
Facilita el mantenimiento del código, evitando duplicar definiciones de objetos.

# 4️⃣ Ejemplo práctico
```bash
type Persona = { nombre: string };
type Empleado = { salario: number };
type EmpleadoCompleto = Persona & Empleado;

const empleados: EmpleadoCompleto[] = [
    { nombre: "Juan", salario: 1500 },
    { nombre: "Ana", salario: 2000 }
];
```
Función genérica para obtener el primer elemento de un arreglo
```bash
function obtenerPrimerElemento<T>(array: T[]): T {
    return array[0];
}

const primerEmpleado = obtenerPrimerElemento(empleados);

console.log("Nombre:", primerEmpleado.nombre); // Juan
console.log("Salario:", primerEmpleado.salario); // 1500
```

# ✅ Cómo funciona en este ejemplo:
1.	EmpleadoCompleto combina Persona y Empleado.
2.	El arreglo empleados contiene objetos que cumplen con todas las propiedades.
3.	La función genérica obtenerPrimerElemento devuelve el primer objeto del arreglo.
4.	Gracias a la intersección de tipos, podemos acceder a nombre y salario sin errores
   
#  5️⃣Ventajas de usar intersección de tipos
1.	Reutilización de tipos → Combina tipos existentes sin duplicar código.
2.	Seguridad de tipos → TypeScript asegura que todos los valores cumplan todas las propiedades.
3.	Flexibilidad → Permite crear objetos con características de varios tipos.
4.	Mejor mantenimiento → Cambios en un tipo se reflejan automáticamente en los tipos combinados.

# 6️⃣Limitaciones
•	No se puede combinar tipos incompatibles, como 
```bash
{ a: string } & { a: number }.
```
•	Puede complicar la lectura si combinas muchos tipos grandes.
•	Requiere que todos los tipos tengan propiedades compatibles, de lo contrario TypeScript da error.


# 7️⃣Diferencia con la unión de tipos
•	Intersección (&) → Debe cumplir todos los tipos.
•	Unión (|) → Puede cumplir cualquiera de los tipos.
```bash
type A = { a: string };
type B = { b: number };
```
