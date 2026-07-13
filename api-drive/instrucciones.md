# Configuración de la API en Google Sheets

Sigue estos pasos para crear tu base de datos y generar la API que conectará la Recepción con la App del Alumno.

## Paso 1: Crear la Base de Datos
1. Ve a tu cuenta de Google Drive y crea una nueva **Hoja de cálculo de Google (Google Sheets)**.
2. En la Fila 1 (los encabezados), escribe exactamente los siguientes nombres de columna desde la letra A hasta la H:
   - **A1:** Fecha
   - **B1:** Nombre
   - **C1:** Usuario
   - **D1:** Password
   - **E1:** DatosExtra
   - **F1:** Notas
   - **G1:** Inasistencias
   - **H1:** Deuda

## Paso 2: Agregar el Código del Servidor
1. En el menú superior de Google Sheets, haz clic en **Extensiones** y luego en **Apps Script**.
2. Se abrirá una nueva pestaña con un editor de código. Borra todo lo que haya en el archivo `Código.gs`.
3. Abre el archivo `codigo.gs` que está en esta misma carpeta (`api-drive/codigo.gs`).
4. **Copia** todo el contenido de ese archivo y **pégalo** en el editor de Apps Script.
5. Haz clic en el ícono del disquete (Guardar) o presiona `Ctrl + S`.

## Paso 3: Publicar como API (Implementación)
1. En la esquina superior derecha de Apps Script, haz clic en el botón azul **Implementar** (Deploy).
2. Selecciona **Nueva implementación**.
3. Haz clic en el ícono de la rueda dentada (Configuración) a la izquierda de "Seleccionar tipo" y elige **Aplicación Web**.
4. Completa la configuración así:
   - **Descripción:** "API Alumnos" (o el nombre que quieras).
   - **Ejecutar como:** "Yo (tu_correo@gmail.com)".
   - **Quién tiene acceso:** Selecciona **"Cualquier persona"** (Esto es vital para que las apps externas puedan conectarse).
5. Haz clic en **Implementar**.
6. Google te pedirá que autorices el acceso. Haz clic en **"Autorizar acceso"**, elige tu cuenta de Google. (Si te sale una advertencia de que la app no está verificada, haz clic en "Avanzado" y luego en "Ir a [Tu Proyecto] (inseguro)").
7. Finalmente, aparecerá una ventana con una URL debajo de la etiqueta **"URL de la aplicación web"**.

## Paso 4: Conectar las Apps Frontends
1. **¡Copia esa URL!**
2. Ve a la carpeta `recepcion/js/` y pega la URL en la constante `API_URL` del archivo `app.js`.
3. Ve a la carpeta `alumno/js/` y pega la **misma** URL en la constante `API_URL` del archivo `app.js`.

¡Listo! Tu backend y tu base de datos ya están funcionando.
