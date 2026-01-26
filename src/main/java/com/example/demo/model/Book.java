package com.example.demo.model;

public class Book {
    private Integer id;  // Changed to Integer to allow null
    private String title;
    private String author;
    private int edition;
    private String publisher;
    
    // Constructors
    public Book() {
    }
    
    public Book(Integer id, String title, String author, int edition, String publisher) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.edition = edition;
        this.publisher = publisher;
    }
    
    // Getters and Setters
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getAuthor() {
        return author;
    }
    
    public void setAuthor(String author) {
        this.author = author;
    }
    
    public int getEdition() {
        return edition;
    }
    
    public void setEdition(int edition) {
        this.edition = edition;
    }
    
    public String getPublisher() {
        return publisher;
    }
    
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }
    
    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", edition=" + edition +
                ", publisher='" + publisher + '\'' +
                '}';
    }
}
