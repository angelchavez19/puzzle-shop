# Día 1: Definición del Proyecto

## 📦 Producto

En este reto, he decidido crear un **ecommerce** exclusivo para la venta de **cubos de Rubik y puzzles**. Los productos estarán organizados de la siguiente manera:

### Categorías de Productos:

1. **Cubos de Rubik**
   - **Stickerless**
   - **Con stickers** (base blanca, negra, etc.)
   - **Fibra de carbono**
   - **Ediciones limitadas**
2. **Puzzles Hanayama**
   - **Niveles de dificultad** (medidos en estrellas)
     - Los puzzles tienen escalas de dificultad variables según la serie. Por ejemplo:
       - **Máximo 5 estrellas**
       - **Máximo 10 estrellas**
   - **Ediciones coleccionables**
   - **Niveles de dificultad** por serie: Cada serie de Hanayama puede tener una escala de dificultad distinta, por ejemplo:
     - Serie A: 1-5 estrellas
     - Serie B: 1-10 estrellas

Cada producto tendrá la siguiente información:

- **Nombre del producto**
- **Descripción**
- **Precio** (por unidad)
- **Categoría** (cubos de Rubik, puzzles Hanayama, etc.)
- **Marca** (por ejemplo: Rubik’s, Hanayama, marcas exclusivas)
- **Imágenes** (galería de fotos del producto)
- **Stock disponible** (cantidad en inventario)
- **Valoraciones y opiniones** de clientes (incluyendo puntuación)
- **Nivel de dificultad** (para puzzles Hanayama, medido en estrellas, varía según la serie)
- **Enlaces a videos** (tutoriales o resoluciones)
- **Peso** (en gramos o kilogramos)
- **Dimensiones** (largo, ancho y alto en cm)
- **Descuentos disponibles** (si hay algún descuento aplicable)
- **Cupones aplicables** (si hay cupones disponibles para la compra)
- **Precio de envío** (según ubicación, esto puede variar dependiendo de la zona del comprador)

---

### Detalles Adicionales:

- **Cupones y descuentos**: Los cupones serán aplicados en el proceso de compra y el sistema calculará el descuento final basado en las reglas del cupon. Los cupones pueden ser:
  - Descuentos por porcentaje (por ejemplo, 10% de descuento)
  - Descuentos por monto fijo (por ejemplo, $5 de descuento)
  - Cupones para compras mínimas (por ejemplo, compra más de $50 para obtener un descuento)
- **Envíos**: Los costos de envío varían según la ubicación del comprador. Durante el proceso de compra, el sistema calculará el costo de envío basado en la dirección ingresada.

---

### Ejemplo de Producto:

1. **Cubos de Rubik Stickerless**
   - **Descripción**: Cubo Rubik sin stickers, ideal para competiciones.
   - **Precio**: $20
   - **Marca**: Rubik’s
   - **Categoría**: Cubos de Rubik
   - **Imágenes**: ![Imagen del cubo](url_de_imagen)
   - **Stock disponible**: 100 unidades
   - **Valoraciones**: ⭐⭐⭐⭐⭐ (1000 valoraciones)
   - **Dimensiones**: 5.7 x 5.7 x 5.7 cm
   - **Peso**: 110 g
   - **Descuento**: 10% de descuento si compras más de 3 unidades
   - **Cupones**: CUPO10 (10% de descuento adicional)
   - **Nivel de dificultad**: Medio (por ejemplo, en una escala de 1 a 10)

---

## 📝 Mockup

He realizado el mockup del software utilizando [Draw IO](https://draw.io/). El diseño visual se basa en una interfaz sencilla con un enfoque en la facilidad de uso.

[**Mockup**](https://drive.google.com/file/d/15LBM3lK3Nb9ePQAUq-zSwLdEtp1PCrmq/view?usp=sharing)

---

## 🚀 Estructura Inicial del Proyecto

### Frontend:

- **Framework**: Nuxt 3
- **Tecnologías**: TypeScript, Composition API, SSR (Server-Side Rendering)
- **HTTP Requests**: Axios

### Backend:

- **Framework**: NestJS
- **Integración con MongoDB**: Mongoose (encapsulado en NestJS)

### Base de Datos:

- **MongoDB**: Usado para persistir productos, usuarios, pedidos, reseñas y cupones.

### Autenticación:

- **Cookies Sessions** para la gestión de sesiones de usuario.

---

## 🚀 Próximos Pasos:

- Avanzar en la implementación de las funcionalidades básicas de la tienda online.
- Integración de productos en el frontend.
- Comenzar la gestión de usuarios (registro y login).

---

**Hecho con 💡 y ❤️ para los puzzles.**
