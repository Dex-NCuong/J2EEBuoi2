package com.example.demo.service;

import com.example.demo.model.Book;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    
    private List<Book> books = new ArrayList<>();
    private int nextId = 1;
    
    // Constructor - Khởi tạo dữ liệu sách mẫu
    public BookService() {
        // Thêm sách mẫu
        addBook(new Book(null, "Spring Boot", "Huy Cuong", 1, "NXB Trẻ"));
        addBook(new Book(null, "Spring Boot V2", "Anh", 2, "NXB Kim Đồng"));
        addBook(new Book(null, "Java Programming", "Nguyễn Văn A", 3, "NXB Giáo Dục"));
        addBook(new Book(null, "Web Development with Thymeleaf", "Trần Thị B", 1, "NXB Lao Động"));
        addBook(new Book(null, "Microservices Architecture", "Lê Văn C", 2, "NXB Thông Tin"));
    }
    
    // Get all books
    public List<Book> getAllBooks() {
        return new ArrayList<>(books);
    }
    
    // Get book by ID
    public Optional<Book> getBookById(int id) {
        return books.stream()
                .filter(book -> book.getId() != null && book.getId() == id)
                .findFirst();
    }
    
    // Add a new book
    public Book addBook(Book book) {
        book.setId(nextId++);
        books.add(book);
        return book;
    }
    
    // Update an existing book
    public Book updateBook(int id, Book updatedBook) {
        Optional<Book> existingBook = getBookById(id);
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setEdition(updatedBook.getEdition());
            book.setPublisher(updatedBook.getPublisher());
            return book;
        }
        return null;
    }
    
    // Delete a book
    public boolean deleteBook(int id) {
        return books.removeIf(book -> book.getId() != null && book.getId() == id);
    }
}
