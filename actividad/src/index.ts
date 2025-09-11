import { input, select } from "@inquirer/prompts";
import { Carrito } from "./models/Carrito";
import { GestorArchivos } from "./models/GestorArchivos";
import { Producto } from "./models/Producto";
import { productos } from "./data/productos";
import { formatearPrecio } from "./utils/format";

// Crear 5 gestores de archivos
const gestores: GestorArchivos<string>[] = [
  new GestorArchivos("Gestor 1"),
  new GestorArchivos("Gestor 2"),
  new GestorArchivos("Gestor 3"),
  new GestorArchivos("Gestor 4"),
  new GestorArchivos("Gestor 5"),
];

// Crear 8 carritos
const carritos: Carrito<Producto>[] = [];
for (let i = 1; i <= 8; i++) {
  carritos.push(new Carrito<Producto>(i));
}

async function main() {
  const nombre = await input({ message: "Ingrese su nombre:" });
  console.log(`\n👋 Bienvenido/a ${nombre} a la tienda!\n`);

  let salir = false;

  while (!salir) {
    const opcion = await select({
      message: "Seleccione una opción:",
      choices: [
        { name: "Ver productos", value: "productos" },
        { name: "Agregar producto a carrito", value: "agregar" },
        { name: "Ver carritos", value: "carritos" },
        { name: "Ver total a pagar", value: "total" },
        { name: "Salir", value: "salir" },
      ],
    });

    switch (opcion) {
      case "productos":
        console.log("\n📦 Lista de productos disponibles:");
        productos.forEach((p, i) =>
          console.log(`${i + 1}. ${p.nombre} - $${formatearPrecio(p.precio)}`)
        );
        console.log("");
        break;

      case "agregar": {
        const carritoSeleccionadoRaw = await select({
          message: "Seleccione un carrito:",
          choices: carritos.map((c) => ({
            name: `Carrito ${c.id}`,
            value: c.id,
          })),
        });
        const carritoIndex = Number(carritoSeleccionadoRaw) - 1;

        const productoSeleccionadoRaw = await select({
          message: "Seleccione un producto:",
          choices: productos.map((p, i) => ({
            name: `${p.nombre} - $${formatearPrecio(p.precio)}`,
            value: i,
          })),
        });
        const productoSeleccionado = Number(productoSeleccionadoRaw);

        const carrito = carritos[carritoIndex]!;
        const producto = productos[productoSeleccionado]!;

        carrito.agregarProducto(producto);

        console.log(
          `✅ Producto agregado al Carrito ${carrito.id}: ${producto.nombre}\n`
        );
        break;
      }

      case "carritos":
        console.log("\n🛒 Carritos:");
        carritos.forEach((c) => {
          console.log(`Carrito ${c.id}:`);
          if (c.verProductos().length === 0) {
            console.log("  (Vacío)");
          } else {
            c.verProductos().forEach((p) =>
              console.log(`  - ${p.nombre} $${formatearPrecio(p.precio)}`)
            );
          }
        });
        console.log("");
        break;

      case "total":
        let total = 0;
        carritos.forEach((c) => {
          total += c.calcularTotal();
        });
        console.log(`\n💰 Total a pagar: $${formatearPrecio(total)}\n`);
        break;

      case "salir":
        console.log("\n👋 Gracias por usar la tienda. Hasta luego!\n");
        salir = true;
        break;
    }
  }
}

main();
