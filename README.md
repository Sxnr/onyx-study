# 🚀 Onyx Study - LMS & Hibrid Web IDE

![Onyx Study Banner](https://img.shields.io/badge/Status-En_Desarrollo-mintgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**Onyx Study** es una Plataforma de Gestión de Aprendizaje (LMS) híbrida construida para modernizar la forma en que los estudiantes universitarios aprenden a programar. Integra un entorno de desarrollo (IDE) directamente en el navegador con evaluación de código en tiempo real, gamificación y gestión de apuntes personales, todo bajo una interfaz minimalista (Dark & Mint Green).

---

## ✨ Características Principales

*   💻 **IDE Web Integrado (Split-Screen):** Editor Monaco (motor de VS Code) embebido. Permite programar en **Java 17, Python 3, C++, JavaScript y Dart**, con ejecución segura en la nube (vía JDoodle) y terminal virtual de resultados.
*   📚 **Bóveda Híbrida (Vault):** Sistema de gestión documental para subir, organizar y leer PDFs universitarios y archivos Markdown en un entorno sin distracciones.
*   🏆 **Sistema de Retos y Gamificación:** Ejercicios de código estructurados desde sintaxis básica hasta algoritmos avanzados, con validación automática y cálculo de Experiencia (XP).
*   💼 **Project Hub:** Catálogo de proyectos reales guiados paso a paso, con tracker de progreso local (Zustand), tips dinámicos por tarea y material de apoyo curado para armar tu portafolio.
*   🔒 **Autenticación Segura:** Sistema completo de registro y login utilizando JSON Web Tokens (JWT) y contraseñas hasheadas.

---

## 🛠️ Stack Tecnológico

El proyecto está separado en una arquitectura cliente-servidor:

**Frontend:**
*   React 18 + Vite
*   TypeScript
*   Tailwind CSS (Diseño a medida Dark/Mint)
*   Zustand (Gestión de estado global y persistencia)
*   Lucide React (Iconografía)
*   Monaco Editor (IDE)

**Backend:**
*   Node.js + Express.js
*   PostgreSQL (Base de datos relacional)
*   Prisma ORM (Modelado de datos y migraciones)
*   JWT (Autenticación)

---

## 🚀 Instalación y Uso Local

Para correr Onyx Study en tu máquina local, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/Sxnr/onyx-study](https://github.com/Sxnr/onyx-study)
cd onyx-study
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```
*   Crea un archivo `.env` en la carpeta `backend` con las siguientes credenciales (reemplaza con tus datos):
    ```env
    DATABASE_URL="postgresql://usuario:password@localhost:5432/onyx_db"
    JWT_SECRET="tu_secreto_super_seguro"
    JDOODLE_CLIENT_ID="tu_client_id"
    JDOODLE_CLIENT_SECRET="tu_client_secret"
    ```
*   Sincroniza la base de datos y corre las migraciones:
    ```bash
    npx prisma db push
    ```
*   Inicia el servidor backend:
    ```bash
    npm run dev
    ```

### 3. Configurar el Frontend
Abre una nueva terminal en la raíz del proyecto.
```bash
cd frontend
npm install
npm run dev
```
La aplicación estará corriendo de forma local en `http://localhost:5173`.

---

## 🗺️ Roadmap Actual

- [x] Fase 1: Arquitectura y Base de Datos (PostgreSQL/Prisma).
- [x] Fase 2: UI/UX, Dashboard y Sistema de Diseño (Tailwind).
- [x] Fase 3: Bóveda de archivos y Visor de PDF integrado.
- [x] Fase 4: IDE Web con Monaco Editor y motor de ejecución (JDoodle).
- [x] Fase 5: Gamificación, cálculo de XP y niveles.
- [x] Fase 6: Project Hub interactivo y tracker de proyectos en Zustand.
- [ ] Fase 7: Funciones sociales (Leaderboard, Rachas, Mascota).
- [ ] Fase 8: Panel de Administración (Backoffice).
- [ ] Fase 9: Herramientas de Estudio Avanzadas (Focus Mode, Tutor IA).
- [ ] Fase 10: Despliegue a Producción (Cloudflare Pages + VPS Debian 12).

---

## 👨‍💻 Autor

Desarrollado por **Francisco Javier Carrera Fernández**, Estudiante de Ingeniería Civil en Informatica.