function switchTab(tab) {
    currentTab = tab;
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('readBooks').classList.add('hidden');
    document.getElementById('wishlistBooks').classList.add('hidden');
    
    if (tab === 'read') {
        document.getElementById('readBooks').classList.remove('hidden');
    } else {
        document.getElementById('wishlistBooks').classList.remove('hidden');
    }
}

function openModal() {
    document.getElementById('bookModal').classList.add('active');
    document.getElementById('bookList').value = currentTab;
}

function closeModal() {
    document.getElementById('bookModal').classList.remove('active');
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookImage').value = '';
    document.getElementById('bookGenre').value = '';
}

function renderBooks() {
    renderBookList('read', document.getElementById('readBooks'));
    renderBookList('wishlist', document.getElementById('wishlistBooks'));
}

function renderBookList(listType, container) {
    const booksList = books[listType];
    
    if (booksList.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">${listType === 'read' ? '📖' : '⭐'}</div>
                <h3>No hay libros todavía</h3>
                <p>Haz clic en el botón + para añadir tu primer libro</p>
            </div>
        `;
        return;
    }

    container.innerHTML = booksList.map(book => {
        const safeTitle = escapeHtml(book.title);
        const safeAuthor = escapeHtml(book.author);
        const safeGenre = book.genre ? escapeHtml(book.genre) : '';
        const safeImage = book.image ? escapeHtml(book.image) : '';
        
        return `
            <div class="book-card">
                <div class="book-image">
                    ${safeImage ? `<img src="${safeImage}" alt="${safeTitle}" onerror="this.parentElement.innerHTML='📚'">` : '📚'}
                </div>
                <div class="book-title">${safeTitle}</div>
                <div class="book-author">por ${safeAuthor}</div>
                ${safeGenre ? `<div class="book-genre">${safeGenre}</div>` : ''}
                <div class="book-actions">
                    <button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); moveBook('${listType}', '${listType === 'read' ? 'wishlist' : 'read'}', '${book.id}')">
                        ${listType === 'read' ? '⭐ A Deseos' : '📖 A Leídos'}
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); deleteBook('${listType}', '${book.id}')">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Función para escapar HTML y prevenir XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}