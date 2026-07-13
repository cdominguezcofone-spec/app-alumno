# Plan de Clase: Redes, API y Apps Interactivos (1 Hora)

## Objetivo de la Clase
Los alumnos implementarán una arquitectura cliente-servidor real simulando el entorno de una institución: configurarán la red local, desplegarán una base de datos en Google Sheets como API, y conectarán dos aplicaciones web (App Recepcionista y App Alumno) a través de GitHub Pages y códigos QR.

## Duración Total: 60 Minutos

### Bloque 1: Introducción y Capa Física (10 min)
- **Tema:** Arquitectura del Sistema (Recepción -> Red -> Base de Datos -> Alumno).
- **Escenario:** 
  - La Recepcionista usa una PC fija en "Modo Quiosco" para registrar ingresos.
  - El Alumno usa su celular leyendo un código QR.
  - Un administrador central maneja notas/pagos.
- **Actividad Práctica:** 
  - Materializar la topología P2P (Punto a Punto): Conectar un extremo del cable Ethernet a la PC 1 (Rol: Recepción) y el otro extremo a la PC 2 (Rol: Nodo Central/Administración).
- **Recurso:** `presentacion/index.html` (Diapositivas 1 a 3).

### Bloque 2: Capa Lógica - Red Local (10 min)
- **Tema:** IPs estáticas para servicios institucionales.
- **Actividad Práctica:**
  - Configurar las IPs estáticas en ambas PCs para que se encuentren en la misma red local.
  - PC 1 (Recepción): IP `192.168.1.10`, Máscara `255.255.255.0`.
  - PC 2 (Nodo Central): IP `192.168.1.11`, Máscara `255.255.255.0`.
  - Probar conectividad abriendo la terminal (CMD) y haciendo `ping 192.168.1.10` y viceversa.
- **Recurso:** `presentacion/index.html` (Diapositiva 4).

### Bloque 3: Base de Datos y API en la Nube (15 min)
- **Tema:** Almacenamiento centralizado con Google Sheets.
- **Actividad Práctica:**
  - Leer la guía `api-drive/instrucciones.md`.
  - Crear una hoja de cálculo con columnas: Fecha, Nombre, Usuario, Password, DatosExtra, Notas, Inasistencias, Deuda.
  - Abrir *Extensiones > Apps Script*, pegar el contenido de `api-drive/codigo.gs` y publicar como "Aplicación Web" (Permisos: Cualquier persona).
  - Copiar la URL de la API generada.
- **Recurso:** Carpeta `api-drive/` (`codigo.gs` e `instrucciones.md`), `presentacion/index.html` (Diapositiva 5).

### Bloque 4: Despliegue de los Frontends (15 min)
- **Tema:** Hosting estático en GitHub Pages y dos interfaces distintas.
- **Actividad Práctica:**
  - Abrir la carpeta `recepcion` y editar `js/app.js` para pegar la URL de la API.
  - Abrir la carpeta `alumno` y editar `js/app.js` para pegar la misma URL de la API.
  - Subir ambos archivos a un repositorio de GitHub y habilitar **GitHub Pages**.
  - Generar un código QR de la URL pública de `alumno.html`. Aclarar que este QR es **genérico e idéntico para todos los alumnos**, pero al escanearlo, cada uno usará sus propias credenciales para ver sus datos.
- **Recurso:** Carpetas `recepcion/` y `alumno/`, `presentacion/index.html` (Diapositiva 6).

### Bloque 5: Pruebas de Integración (10 min)
- **Tema:** Flujo completo.
- **Actividad Práctica:**
  - **Rol Recepción:** Abrir `recepcion/index.html`, registrar un nuevo alumno. La app genera y muestra usuario/contraseña.
  - **Rol Alumno:** Escanear el QR con el celular, entrar a `alumno/index.html`. Loguearse con las credenciales y probar cargar datos extra o consultar (deuda, notas, etc.).
  - **Rol Administrador:** Modificar la celda de "Deuda" o "Notas" desde Google Sheets, y verificar que el alumno ve la actualización al momento.
- **Recurso:** `presentacion/index.html` (Diapositiva 7).
