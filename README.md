# Prueba-Tecnica-Frontend-Angular
Prueba Tecnica Frontend Angular by Angel Melendres
# 📦 Angular Products Application

Aplicación web desarrollada con **Angular** para la gestión de productos, que permite:

- Listar productos
- Buscar productos
- Crear productos
- Editar productos
- Eliminar productos

La aplicación fue desarrollada siguiendo principios de **arquitectura modular**, **separación de responsabilidades** y **testabilidad**, utilizando Angular moderno con **Signals**, **Facade Pattern** y **tests unitarios con Vitest**.


---

# ▶️ Cómo ejecutar el proyecto

## 1️⃣ Instalar dependencias

npm install

## 2️⃣ Ejecutar la aplicación

ng serve

La aplicación estará disponible en:

http://localhost:4200
🧪 Ejecutar pruebas

## Ejecutar tests:

npm run test

Ejecutar tests con coverage:

npm run test:coverage

El reporte de cobertura se genera en:

/coverage


---

# 🚀 Tecnologías utilizadas

- Angular 21
- TypeScript
- RxJS
- Angular Signals
- Vitest
- Angular Standalone Components
- CSS

---

# 🏗️ Arquitectura del proyecto

El proyecto se organiza utilizando una arquitectura **feature-based**, separando responsabilidades por dominio funcional.
src/app
│
├── core
│ └── interceptors
│
├── features
│ └── products
│ ├── components
│ ├── models
│ ├── pages
│ ├── services
│ └── validators
│
└── environments


Esta estructura permite:

- Escalar fácilmente el proyecto
- Separar responsabilidades
- Mantener código organizado
- Facilitar el testing
---

# 📂 Estructura de carpetas

## core

Contiene funcionalidades globales reutilizables de la aplicación.

core/
interceptors/
error-interceptor.ts


### error-interceptor

Interceptor que captura errores HTTP y los propaga para manejo centralizado.

---

# 📦 Feature: Products

Toda la lógica relacionada con productos se encuentra dentro de:


features/products


Esta feature incluye:


components
models
pages
services
validators


---

# 🧩 Components

Componentes reutilizables dentro del dominio de productos.


components/
delete-product-modal
product-actions-menu
product-form
product-search
product-table


---

## product-form

Formulario reactivo que permite:

- Crear productos
- Editar productos
- Validar campos
- Validar ID existente
- Calcular fecha de revisión automáticamente

Tecnologías usadas:

- Reactive Forms
- Custom Validators
- Async Validators

---

## product-table

Tabla que muestra los productos disponibles.

Funcionalidades:

- paginación
- cambio de tamaño de página
- menú de acciones por producto

---

## product-actions-menu

Menú contextual que permite:

- editar producto
- eliminar producto

---

## delete-product-modal

Modal de confirmación para eliminar productos.

---

## product-search

Input de búsqueda que permite filtrar productos en tiempo real.

---

# 📄 Pages

Las páginas representan las vistas completas de la aplicación.


pages/
product-list-page
product-create-page
product-edit-page


---

## product-list-page

Pantalla principal de la aplicación.

Permite:

- listar productos
- buscar productos
- cambiar tamaño de página
- editar productos
- eliminar productos
- navegar a creación de productos

---

## product-create-page

Pantalla que permite crear nuevos productos utilizando `product-form`.

---

## product-edit-page

Pantalla para editar productos existentes.

Carga el producto por `id` y permite modificar sus datos.

---

# ⚙️ Services

Se implementó un patrón **Facade + API Service**.


services/
products-api.ts
products-facade.ts


---

## ProductsApi

Encargado de la comunicación directa con la API.

Métodos principales:


getProducts()
createProduct()
updateProduct()
deleteProduct()
verifyProductId()