// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias globales
const auth = firebase.auth();
const database = firebase.database();

// Variables globales
let currentUser = null;
let currentTab = 'read';
let books = {
    read: [],
    wishlist: []
};

// Verificar estado de autenticación
auth.onAuthStateChanged((user) => {
    document.getElementById('loadingScreen').classList.add('hidden');
    
    if (user) {
        currentUser = user;
        const displayName = user.displayName || user.email;
        document.getElementById('displayUsername').textContent = displayName;
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        loadUserBooks();
    } else {
        currentUser = null;
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('mainApp').classList.add('hidden');
    }
});