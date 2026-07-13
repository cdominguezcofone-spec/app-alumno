// ALUMNOS: PEGUEN AQUÍ LA URL QUE LES DIO GOOGLE APPS SCRIPT
const API_URL = 'https://script.google.com/macros/s/AKfycby3fnPCaeJSgWJelRiYFkhaFLE1lCqPQD749P4pKDhDZvUJ3d6ZiQFAoh3216qsiMw/exec';

let currentUser = null;
let currentPass = null;
let userData = null;

// Login Form Submit
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if(API_URL === 'PEGAR_AQUI_LA_URL_DE_APPS_SCRIPT') {
        alert("⚠️ Falta configurar la API_URL en alumno/js/app.js.");
        return;
    }

    const u = document.getElementById('usuario').value;
    const p = document.getElementById('password').value;

    document.getElementById('loadingLogin').style.display = 'block';

    try {
        const response = await fetch(`${API_URL}?action=estado_alumno&usuario=${u}&password=${p}`);
        const result = await response.json();

        if(result.status === 'success') {
            currentUser = u;
            currentPass = p;
            userData = result;
            
            document.getElementById('loginView').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            document.getElementById('welcomeName').innerText = 'Hola, ' + result.nombre;
            
            if(result.datos_extra) {
                document.getElementById('datosExtra').value = result.datos_extra;
            }
        } else {
            alert(result.msg);
        }
    } catch (error) {
        alert("Error conectando con la API.");
        console.error(error);
    } finally {
        document.getElementById('loadingLogin').style.display = 'none';
    }
});

// Actualizar Perfil Form Submit
document.getElementById('perfilForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const extra = document.getElementById('datosExtra').value;
    document.getElementById('loadingPerfil').style.display = 'block';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'update_alumno',
                usuario: currentUser,
                password: currentPass,
                datos_extra: extra
            }),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });

        const result = await response.json();
        alert(result.msg);
    } catch (error) {
        alert("Error al actualizar.");
    } finally {
        document.getElementById('loadingPerfil').style.display = 'none';
    }
});

// Ver estados
async function verEstado(tipo) {
    const box = document.getElementById('statusBox');
    const title = document.getElementById('statusTitle');
    const val = document.getElementById('statusValue');
    
    box.style.display = 'block';
    val.innerText = 'Cargando...';

    // Hacemos fetch para tener los datos más actualizados (por si administración cambió algo)
    try {
        const response = await fetch(`${API_URL}?action=estado_alumno&usuario=${currentUser}&password=${currentPass}`);
        const result = await response.json();
        
        if(result.status === 'success') {
            userData = result; // actualizamos
            if(tipo === 'notas') {
                title.innerText = 'Tus Notas';
                val.innerText = userData.notas || 'Sin cargar';
            } else if(tipo === 'inasistencias') {
                title.innerText = 'Total Inasistencias';
                val.innerText = userData.inasistencias || '0';
            } else if(tipo === 'deuda') {
                title.innerText = 'Estado de Cuenta (Deuda)';
                val.innerText = userData.deuda || '$0';
            }
        }
    } catch(e) {
        val.innerText = 'Error de red';
    }
}

function logout() {
    currentUser = null;
    currentPass = null;
    userData = null;
    document.getElementById('loginForm').reset();
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('statusBox').style.display = 'none';
    document.getElementById('loginView').style.display = 'block';
}
