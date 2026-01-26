// ==================== API Configuration ====================
const API_BASE_URL = 'http://localhost:8080/api/books';

// ==================== DOM Elements ====================
const booksGrid = document.getElementById('booksGrid');
const emptyState = document.getElementById('emptyState');
const bookModal = document.getElementById('bookModal');
const bookForm = document.getElementById('bookForm');
const addBookBtn = document.getElementById('addBookBtn');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const modalTitle = document.getElementById('modalTitle');
const submitBtnText = document.getElementById('submitBtnText');

let isEditMode = false;
let currentBookId = null;

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    setupEventListeners();
});

// ==================== Event Listeners ====================
function setupEventListeners() {
    addBookBtn.addEventListener('click', () => openModal());
    closeModal.addEventListener('click', () => closeModalHandler());
    cancelBtn.addEventListener('click', () => closeModalHandler());
    bookForm.addEventListener('submit', handleFormSubmit);
    
    // Close modal when clicking outside
    bookModal.addEventListener('click', (e) => {
        if (e.target === bookModal) {
            closeModalHandler();
        }
    });
}

// ==================== API Functions ====================
async function loadBooks() {
    try {
        showLoading();
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error loading books:', error);
        showNotification('Không thể tải danh sách sách. Vui lòng kiểm tra kết nối server.', 'error');
        hideLoading();
    }
}

async function addBook(bookData) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add book');
        }
        
        const newBook = await response.json();
        showNotification('Thêm sách thành công!', 'success');
        return newBook;
    } catch (error) {
        console.error('Error adding book:', error);
        showNotification('Không thể thêm sách. Vui lòng thử lại.', 'error');
        throw error;
    }
}

async function updateBook(id, bookData) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update book');
        }
        
        const updatedBook = await response.json();
        showNotification('Cập nhật sách thành công!', 'success');
        return updatedBook;
    } catch (error) {
        console.error('Error updating book:', error);
        showNotification('Không thể cập nhật sách. Vui lòng thử lại.', 'error');
        throw error;
    }
}

async function deleteBook(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa sách này?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
        
        showNotification('Xóa sách thành công!', 'success');
        loadBooks();
    } catch (error) {
        console.error('Error deleting book:', error);
        showNotification('Không thể xóa sách. Vui lòng thử lại.', 'error');
    }
}

// ==================== Display Functions ====================
function displayBooks(books) {
    hideLoading();
    
    if (books.length === 0) {
        booksGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    booksGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    booksGrid.innerHTML = books.map(book => createBookCard(book)).join('');
    
    // Add event listeners to action buttons
    document.querySelectorAll('.icon-btn.edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const bookId = parseInt(btn.dataset.id);
            const book = books.find(b => b.id === bookId);
            if (book) openModal(book);
        });
    });
    
    document.querySelectorAll('.icon-btn.delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const bookId = parseInt(btn.dataset.id);
            deleteBook(bookId);
        });
    });
}

function createBookCard(book) {
    return `
        <div class="book-card">
            <div class="book-card-header">
                <div class="book-id">#${book.id}</div>
                <div class="book-actions">
                    <button class="icon-btn edit" data-id="${book.id}" title="Chỉnh sửa">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="icon-btn delete" data-id="${book.id}" title="Xóa">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>
            </div>
            <h3 class="book-title">${escapeHtml(book.title)}</h3>
            <div class="book-info">
                <div class="book-info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span><span class="book-info-label">Tác giả:</span> ${escapeHtml(book.author)}</span>
                </div>
                <div class="book-info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    </svg>
                    <span><span class="book-info-label">Phiên bản:</span> ${book.edition}</span>
                </div>
                <div class="book-info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                    </svg>
                    <span><span class="book-info-label">NXB:</span> ${escapeHtml(book.publisher)}</span>
                </div>
            </div>
        </div>
    `;
}

// ==================== Modal Functions ====================
function openModal(book = null) {
    isEditMode = !!book;
    currentBookId = book ? book.id : null;
    
    modalTitle.textContent = isEditMode ? 'Chỉnh sửa sách' : 'Thêm sách mới';
    submitBtnText.textContent = isEditMode ? 'Cập nhật' : 'Thêm sách';
    
    if (isEditMode) {
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookEdition').value = book.edition;
        document.getElementById('bookPublisher').value = book.publisher;
    } else {
        bookForm.reset();
    }
    
    bookModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    bookModal.classList.remove('active');
    document.body.style.overflow = '';
    bookForm.reset();
    isEditMode = false;
    currentBookId = null;
}

// ==================== Form Handling ====================
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const bookData = {
        title: document.getElementById('bookTitle').value.trim(),
        author: document.getElementById('bookAuthor').value.trim(),
        edition: parseInt(document.getElementById('bookEdition').value),
        publisher: document.getElementById('bookPublisher').value.trim()
    };
    
    try {
        if (isEditMode) {
            await updateBook(currentBookId, bookData);
        } else {
            await addBook(bookData);
        }
        
        closeModalHandler();
        loadBooks();
    } catch (error) {
        // Error already handled in API functions
    }
}

// ==================== Utility Functions ====================
function showLoading() {
    booksGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p style="margin-top: var(--spacing-md); color: var(--text-secondary);">Đang tải...</p>
        </div>
    `;
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Notification function is already defined in script.js
// If not available, define it here
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}
