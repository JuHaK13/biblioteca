function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    hideError();
    
    if (tab === 'login') {
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
    } else {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
    }
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function hideError() {
    document.getElementById('errorMessage').classList.remove('show');
}

async function registerUser() {
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const name = document.getElementById('registerName').value.trim();

    if (!email || !password) {
        showError('Por favor, completa todos los campos obligatorios');
        return;
    }

    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        if (name) {
            await userCredential.user.updateProfile({ displayName: name });
        }
        
        hideError();
        
        // Limpiar formulario
        document.getElementById('registerEmail').value = '';
        document.getElementById('registerPassword').value = '';
        document.getElementById('registerName').value = '';
    } catch (error) {
        console.error('Error al registrar:', error);
        showError(getErrorMessage(error.code));
    }
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showError('Por favor, completa todos los campos');
        return;
    }

    try {
        await auth.signInWithEmailAndPassword(email, password);
        hideError();
        
        // Limpiar formulario
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        showError(getErrorMessage(error.code));
    }
}

async function logoutUser() {
    try {
        // Limpiar listeners antes de cerrar sesión
        const userId = currentUser.uid;
        database.ref(`users/${userId}/books/read`).off();
        database.ref(`users/${userId}/books/wishlist`).off();
        
        await auth.signOut();
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión');
    }
}

function getErrorMessage(errorCode) {
    const errors = {
        'auth/email-already-in-use': 'Este email ya está registrado',
        'auth/invalid-email': 'Email inválido',
        'auth/weak-password': 'La contraseña es muy débil',
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
        'auth/network-request-failed': 'Error de conexión. Verifica tu internet'
    };
    return errors[errorCode] || 'Error de autenticación';
}