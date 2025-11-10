Daniel – Prueba técnica (Node + MySQL + React)

CRUD de Categorías y Productos con:

Backend: Node.js, Express, MySQL (mysql2/promise), CORS, dotenv

Frontend: React + Vite, React Router, Axios

UI: CSS moderno (cards, tablas, formularios, botones) sin librerías externas

Descripción del proyecto

El sistema permite:

Categorías: listar, crear, editar, eliminar.

Productos: listar, crear, editar, eliminar, asociados a una categoría.

API REST en /categories y /products.

Frontend tipo dashboard con tablas, formularios y navegación.

Requisitos

Node.js LTS (18+ recomendado)

MySQL Server (8.x) y acceso local

npm (incluido con Node)

Daniel_prueba/
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  │  ├─ category.controller.js
│  │  │  └─ product.controller.js
│  │  ├─ routes/
│  │  │  ├─ category.routes.js
│  │  │  └─ product.routes.js
│  │  ├─ db/
│  │  │  ├─ pool.js
│  │  │  └─ test-connection.js
│  │  └─ index.js
│  ├─ .env
│  └─ package.json
└─ frontend/
   ├─ src/
   │  ├─ api/
   │  │  ├─ client.js
   │  │  ├─ categories.js
   │  │  └─ products.js
   │  ├─ components/Nav.jsx
   │  ├─ pages/
   │  │  ├─ CategoriesList.jsx
   │  │  ├─ CategoryForm.jsx
   │  │  ├─ ProductsList.jsx
   │  │  └─ ProductForm.jsx
   │  └─ main.jsx / index.css
   └─ package.json
