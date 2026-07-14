// CONFIGURACIÓN: URL DE LA API
const API_URL = 'https://script.google.com/macros/s/AKfycby3fnPCaeJSgWJelRiYFkhaFLE1lCqPQD749P4pKDhDZvUJ3d6ZiQFAoh3216qsiMw/exec';

let currentUser = null;
let currentPass = null;
let userData = null;

// 1. Manejo del Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
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
            alert(result.msg || "Error en el inicio de sesión");
        }
    } catch (error) {
        alert("Error conectando con la API.");
        console.error(error);
    } finally {
        document.getElementById('loadingLogin').style.display = 'none';
    }
});

// 2. Actualizar Perfil (Datos Extra)
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
        alert("Error al actualizar datos.");
    } finally {
        document.getElementById('loadingPerfil').style.display = 'none';
    }
});

// 3. Consulta de Estados (Notas, Asistencias, Deuda)
async function verEstado(tipo) {
    const box = document.getElementById('statusBox');
    const title = document.getElementById('statusTitle');
    const val = document.getElementById('statusValue');
    
    box.style.display = 'block';
    val.innerText = 'Cargando...';

    try {
        const response = await fetch(`${API_URL}?action=estado_alumno&usuario=${currentUser}&password=${currentPass}`);
        const result = await response.json();
        
        if(result.status === 'success') {
            userData = result; 
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
        val.innerText = 'Error de conexión';
    }
}

// 4. Logout
function logout() {
    currentUser = null;
    currentPass = null;
    userData = null;
    document.getElementById('loginForm').reset();
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('statusBox').style.display = 'none';
    document.getElementById('loginView').style.display = 'block';
}
