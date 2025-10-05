function loadUserBooks() {
    const userId = currentUser.uid;
    
    // Escuchar cambios en la lista de leídos
    database.ref(`users/${userId}/books/read`).on('value', (snapshot) => {
        books.read = [];
        snapshot.forEach((childSnapshot) => {
            books.read.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        // Ordenar por fecha de creación (más recientes primero)
        books.read.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        renderBooks();
    });

    // Escuchar cambios en la lista de deseos
    database.ref(`users/${userId}/books/wishlist`).on('value', (snapshot) => {
        books.wishlist = [];
        snapshot.forEach((childSnapshot) => {
            books.wishlist.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        // Ordenar por fecha de creación (más recientes primero)
        books.wishlist.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        renderBooks();
    });
}

async function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const image = document.getElementById('bookImage').value.trim();
    const genre = document.getElementById('bookGenre').value.trim();
    const list = document.getElementById('bookList').value;

    if (!title || !author) {
        alert('Título y Autor son obligatorios');
        return;
    }

    const book = {
        title,
        author,
        image,
        genre,
        createdAt: Date.now()
    };

    try {
        const userId = currentUser.uid;
        await database.ref(`users/${userId}/books/${list}`).push(book);
        closeModal();
    } catch (error) {
        console.error('Error al añadir libro:', error);
        alert('Error al añadir el libro');
    }
}

async function deleteBook(list, id) {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
        try {
            const userId = currentUser.uid;
            await database.ref(`users/${userId}/books/${list}/${id}`).remove();
        } catch (error) {
            console.error('Error al eliminar libro:', error);
            alert('Error al eliminar el libro');
        }
    }
}

async function moveBook(fromList, toList, id) {
    try {
        const userId = currentUser.uid;
        
        // Obtener el libro
        const snapshot = await database.ref(`users/${userId}/books/${fromList}/${id}`).once('value');
        const book = snapshot.val();
        
        if (book) {
            // Añadir a la nueva lista
            await database.ref(`users/${userId}/books/${toList}`).push(book);
            
            // Eliminar de la lista anterior
            await database.ref(`users/${userId}/books/${fromList}/${id}`).remove();
        }
    } catch (error) {
        console.error('Error al mover libro:', error);
        alert('Error al mover el libro');
    }
}