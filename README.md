# Marketsoft — Frontend

Frontend para el sistema de supermercado **Marketsoft**, construido con React y Vite.

Autor: **Cesar Leyton**

## Descripción

Interfaz para gestionar los recursos del supermercado expuestos por la API del backend:

- **Usuarios**: listado, creación, edición y eliminación.
- **Proveedores**: listado, creación, edición y eliminación.
- **Productos**: listado, creación, edición y eliminación, cada uno asociado a un proveedor.
- **Ventas**: listado con detalles, creación y cambio de vendedor. Las ventas no se pueden eliminar.

## Tecnologías

- React 19 + Vite
- React Router para el enrutamiento
- Axios para las peticiones HTTP
- Bootstrap 5 para los estilos
- React Toastify para las notificaciones

## Organización del proyecto

El proyecto está organizado por features, separando la lógica de cada módulo en carpetas separadas bajo `src/features`. Cada módulo contiene:

- `api/`: funciones que consumen los endpoints del módulo.
- `components/`: formularios y tablas del módulo.
- `pages/`: vistas del módulo (listado, crear, editar).

Además:

- `src/features/shared/http-client.js`: cliente HTTP de Axios (URL base de la API) y utilidad para mostrar los mensajes de error del backend.
- `src/layout/` y `src/components/`: layout general y barra de navegación.
- `src/pages/`: página de inicio.

## Ejecución

### Requisitos

- Tener en ejecución el backend de la aplicación (ver su README). El frontend espera que la API esté disponible en `http://localhost:3000/api` (configurable en `src/features/shared/http-client.js`).
- Hacer `git pull` en el backend para obtener la actualización más reciente con la configuración de CORS
- Node.js 20.19 o superior (o 22.12+)
- npm 10 o superior

### Pasos

```bash
npm install
npm run dev
```

### Scripts

| Comando           | Descripción                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Servidor de desarrollo       |
| `npm run build`   | Build de producción          |
| `npm run lint`    | Linter (oxlint)              |
| `npm run preview` | Previsualizar el build      |

## Vistas

| Ruta                                | Descripción                                     |
| ----------------------------------- | ----------------------------------------------- |
| `/`                                 | Inicio                                          |
| `/products`                         | Listado de productos                            |
| `/products/create`                  | Crear producto                                  |
| `/products/edit/:id`                | Editar producto                                 |
| `/users`                            | Listado de usuarios                             |
| `/users/create`                     | Crear usuario                                   |
| `/users/edit/:id`                   | Editar usuario                                  |
| `/providers`                        | Listado de proveedores                          |
| `/providers/create`                 | Crear proveedor                                 |
| `/providers/edit/:id`               | Editar proveedor                                |
| `/sales`                            | Listado de ventas con detalles                  |
| `/sales/create`                     | Crear venta (descuenta stock)                   |
| `/sales/edit/:id`                   | Cambiar el vendedor de una venta                |
