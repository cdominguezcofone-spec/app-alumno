/**
 * API Backend en Google Apps Script
 * Esta API maneja las peticiones de la app de Recepción y de la app del Alumno.
 * 
 * Columnas requeridas en la hoja:
 * A: Fecha | B: Nombre | C: Usuario | D: Password | E: DatosExtra | F: Notas | G: Inasistencias | H: Deuda
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Como Apps Script no procesa JSON body por defecto fácilmente desde fetch en CORS
  // Usaremos Content-Type text/plain en el fetch o procesaremos el postData puro
  var params;
  try {
    params = JSON.parse(e.postData.contents);
  } catch(ex) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "msg": "Invalid JSON"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var action = params.action;
  
  // 1. Recepcionista: Registra un nuevo alumno
  if (action === 'registro_recepcion') {
    var fecha = new Date().toLocaleString();
    var nombre = params.nombre;
    var usuario = params.usuario;
    var password = params.password;
    
    // Agregamos a la fila (A-H)
    sheet.appendRow([fecha, nombre, usuario, password, "", "Sin cargar", "0", "$0"]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "msg": "Alumno registrado exitosamente"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // 2. Alumno: Actualiza sus datos extras luego de loguearse
  if (action === 'update_alumno') {
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][2] == params.usuario && data[i][3] == params.password) {
        // Encontramos la fila (el índice i es la posición en el array (base 0), la fila de Sheets es i+1)
        // Columna E es la 5 (índice 4 en array)
        sheet.getRange(i+1, 5).setValue(params.datos_extra);
        return ContentService.createTextOutput(JSON.stringify({"status": "success", "msg": "Perfil actualizado correctamente"}))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "msg": "Credenciales incorrectas"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({"status": "error", "msg": "Acción no reconocida"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var action = e.parameter.action;
  var usuario = e.parameter.usuario;
  var password = e.parameter.password;
  
  var data = sheet.getDataRange().getValues();
  
  // 3. Alumno: Consulta su estado (Notas, Deuda, Inasistencias)
  if (action === 'estado_alumno') {
    for (var i = 1; i < data.length; i++) {
      if (data[i][2] == usuario && data[i][3] == password) {
         var notas = data[i][5];
         var inasistencias = data[i][6];
         var deuda = data[i][7];
         var nombre = data[i][1];
         var datosExtra = data[i][4];
         
         return ContentService.createTextOutput(JSON.stringify({
            "status": "success",
            "nombre": nombre,
            "datos_extra": datosExtra,
            "notas": notas,
            "inasistencias": inasistencias,
            "deuda": deuda
         })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "msg": "Usuario o contraseña incorrectos"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Respuesta por defecto si no mandan acción
  return ContentService.createTextOutput("API Activa - Esperando parámetros.")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Permitir peticiones CORS
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
