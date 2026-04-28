# Onyx Study 🚀

**Onyx Study** es una plataforma híbrida LMS (Learning Management System) que integra un entorno de desarrollo seguro (Sandbox) directamente en el navegador. Diseñada con una arquitectura moderna y escalable, permite a los usuarios gestionar recursos educativos, resolver desafíos algorítmicos en tiempo real y hacer un seguimiento gamificado de su progresión técnica.

## 🏗️ Arquitectura y Stack Tecnológico

El proyecto está estructurado bajo un modelo Cliente-Servidor (Monorepo), separando claramente las responsabilidades de la capa de presentación, la lógica de negocio y la capa de persistencia de datos.

### Frontend (Client-Side)
* **Framework:** React (con Vite para un HMR optimizado y builds rápidos).
* **Lenguaje:** TypeScript, garantizando tipado estático y seguridad en tiempo de desarrollo.
* **Gestión de Estado:** Zustand (estado global ligero y sin boilerplate) persistido en `localStorage`.
* **Estilos:** Tailwind CSS v3 (implementando un Design System personalizado "Dark & Mint Green").
* **Ruteo:** React Router DOM (v6) con protección de rutas mediante middlewares de cliente.
* **Peticiones HTTP:** Axios.

### Backend (Server-Side & API)
* **Entorno:** Node.js con Express.
* **Lenguaje:** TypeScript.
* **Autenticación:** JSON Web Tokens (JWT) con encriptación de contraseñas vía `bcrypt`.
* **ORM:** Prisma, manejando migraciones seguras y consultas tipadas.
* **Base de Datos:** PostgreSQL.

### Motor de Ejecución (Sandbox)
* **Integración:** JDoodle Compiler API.
* **Flujo:** El código fuente se envía de forma segura desde el cliente al backend, donde es validado y retransmitido a un contenedor aislado remoto para su compilación y ejecución.

---

## 🚀 Estado Actual del Desarrollo

El proyecto se encuentra en desarrollo activo, habiendo completado la infraestructura core:

- [x] **Fase 1: Backend & Base de Datos**
  - Modelado relacional completo (Usuarios, Documentos, Desafíos, Progreso).
  - Sistema de registro y login con emisión/validación de JWT.
  - Endpoints del Sandbox conectados a motores de ejecución externos.
- [x] **Fase 2: UI/UX y Dashboard**
  - Implementación del sistema de diseño (Dark & Mint Green).
  - Estructura de navegación (Sidebar, Layouts).
  - Sistema de login en el cliente con hidratación de estado vía Zustand.
  - Vistas dinámicas ("Zero-State" Dashboard).
- [ ] **Fase 3: Gestión de Archivos y Bóveda** *(En progreso)*
- [ ] **Fase 4: IDE Web embebido (Monaco Editor)** *(Pendiente)*
- [ ] **Fase 5 y 6: Contenido y Project Hub** *(Pendiente)*

---