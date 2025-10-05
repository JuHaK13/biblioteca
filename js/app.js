// Event listeners para cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('bookModal');
        if (modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// Event listeners para cerrar modal al hacer clic fuera
document.getElementById('bookModal').addEventListener('click', (e) => {
    if (e.target.id === 'bookModal') {
        closeModal();
    }
});

// Event listeners para los formularios (Enter para enviar)
document.getElementById('loginEmail').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loginUser();
});

document.getElementById('loginPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loginUser();
});

document.getElementById('registerEmail').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') registerUser();
});

document.getElementById('registerPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') registerUser();
});

document.getElementById('registerName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') registerUser();
});

// Event listeners para el formulario de añadir libro
document.getElementById('bookTitle').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('bookAuthor').focus();
    }
});

document.getElementById('bookAuthor').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addBook();
    }
});

// Prevenir el envío del formulario al presionar Enter en campos de imagen y género
document.getElementById('bookImage').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('bookGenre').focus();
    }
});

document.getElementById('bookGenre').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addBook();
    }
});

console.log('📚 Mi Biblioteca Personal cargada correctamente');