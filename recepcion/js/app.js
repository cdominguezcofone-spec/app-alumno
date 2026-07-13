// ALUMNOS: PEGUEN AQUÍ LA URL QUE LES DIO GOOGLE APPS SCRIPT
const API_URL = 'PEGAR_AQUI_LA_URL_DE_APPS_SCRIPT';

// URL DE LA APP DEL ALUMNO (Una vez subida a GitHub Pages, pégala aquí para el QR)
// Ejemplo: https://TU_USUARIO.github.io/TU_REPO/alumno/index.html
const ALUMNO_APP_URL = 'https://TU_USUARIO.github.io/TU_REPO/alumno/index.html';

// Generar QR en la pantalla usando la librería qrcode.js
new QRCode(document.getElementById("qrcode"), {
    text: ALUMNO_APP_URL,
    width: 180,
    height: 180,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

// Manejo del formulario de registro
document.getElementById('registroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if(API_URL === 'PEGAR_AQUI_LA_URL_DE_APPS_SCRIPT') {
        alert("⚠️ Primero debes configurar la API_URL de Google Sheets en recepcion/js/app.js.");
        return;
    }

    const nombre = document.getElementById('nombre').value;
    
    // Generar usuario (nombre sin espacios) y password aleatorio
    const usuario = nombre.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100);
    const password = Math.random().toString(36).slice(-6);

    document.getElementById('loading').style.display = 'block';
    document.getElementById('credentialsBox').style.display = 'none';

    try {
        // Enviar datos vía POST al Apps Script
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'registro_recepcion',
                nombre: nombre,
                usuario: usuario,
                password: password
            }),
            // Usamos text/plain para evitar problemas de CORS preflight estrictos en GAS
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });

        const result = await response.json();
        
        if(result.status === 'success') {
            document.getElementById('outUsuario').innerText = usuario;
            document.getElementById('outPassword').innerText = password;
            document.getElementById('credentialsBox').style.display = 'block';
            document.getElementById('nombre').value = '';
        } else {
            alert("Error en el registro: " + result.msg);
        }
    } catch (error) {
        alert("Error de red conectando con la API.");
        console.error(error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});
