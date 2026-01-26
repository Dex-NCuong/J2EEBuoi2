# Book Management System - Spring Boot Demo

## 📚 Tổng quan dự án

Dự án này là một ứng dụng quản lý sách được xây dựng với Spring Boot, bao gồm:
- **Backend**: RESTful API với Spring Boot
- **Frontend**: Giao diện web hiện đại với HTML, CSS, JavaScript

## 🏗️ Cấu trúc dự án

```
demo/
├── src/
│   └── main/
│       ├── java/com/example/demo/
│       │   ├── DemoApplication.java          # Main application
│       │   ├── controller/
│       │   │   ├── HomeController.java       # Home page controller
│       │   │   └── BookController.java       # REST API controller
│       │   ├── model/
│       │   │   └── Book.java                 # Book entity
│       │   └── service/
│       │       └── BookService.java          # Business logic
│       └── resources/
│           └── static/
│               ├── index.html                # Landing page
│               ├── books.html                # Books management page
│               ├── css/
│               │   ├── style.css            # Main styles
│               │   └── books.css            # Books page styles
│               └── js/
│                   ├── script.js            # Main JavaScript
│                   └── books.js             # Books page JavaScript
└── pom.xml                                   # Maven configuration
```

## 🎯 Tính năng

### Backend (REST API)
- ✅ **GET** `/api/books` - Lấy danh sách tất cả sách
- ✅ **GET** `/api/books/{id}` - Lấy thông tin sách theo ID
- ✅ **POST** `/api/books` - Thêm sách mới
- ✅ **PUT** `/api/books/{id}` - Cập nhật thông tin sách
- ✅ **DELETE** `/api/books/{id}` - Xóa sách

### Frontend
- ✅ Giao diện landing page hiện đại với:
  - Hero section với animations
  - Features showcase
  - About section
  - Contact form
  - Dark/Light mode toggle
  
- ✅ Trang quản lý sách với:
  - Hiển thị danh sách sách dạng grid
  - Thêm sách mới
  - Chỉnh sửa thông tin sách
  - Xóa sách
  - Modal form đẹp mắt
  - Responsive design

## 🛠️ Công nghệ sử dụng

### Backend
- **Spring Boot 4.0.2**
- **Lombok** - Giảm boilerplate code
- **Spring Web MVC** - RESTful API

### Frontend
- **HTML5** - Cấu trúc
- **CSS3** - Styling với CSS Variables, Flexbox, Grid
- **JavaScript (ES6+)** - Logic và API integration
- **Google Fonts (Inter)** - Typography

## 📦 Model: Book

```java
public class Book {
    private int id;           // ID sách (tự động tăng)
    private String title;     // Tiêu đề
    private String author;    // Tác giả
    private int edition;      // Phiên bản
    private String publisher; // Nhà xuất bản
}
```

## 🚀 Cách chạy ứng dụng

### Yêu cầu
- Java 25 (hoặc Java 17+)
- Maven (hoặc sử dụng Maven Wrapper có sẵn)

### Các bước chạy

#### Cách 1: Sử dụng Maven Wrapper (Khuyến nghị)
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

#### Cách 2: Sử dụng Maven
```bash
mvn spring-boot:run
```

#### Cách 3: Sử dụng IDE (Eclipse, IntelliJ IDEA, VS Code)
1. Import project as Maven project
2. Chạy `DemoApplication.java` as Java Application

### Truy cập ứng dụng
- **Landing Page**: http://localhost:8080/
- **Books Management**: http://localhost:8080/books.html
- **API Endpoint**: http://localhost:8080/api/books

## 📝 API Examples

### 1. Lấy tất cả sách
```bash
GET http://localhost:8080/api/books
```

### 2. Thêm sách mới
```bash
POST http://localhost:8080/api/books
Content-Type: application/json

{
  "title": "Spring Boot in Action",
  "author": "Craig Walls",
  "edition": 3,
  "publisher": "Manning Publications"
}
```

### 3. Cập nhật sách
```bash
PUT http://localhost:8080/api/books/1
Content-Type: application/json

{
  "title": "Spring Boot in Action - Updated",
  "author": "Craig Walls",
  "edition": 4,
  "publisher": "Manning Publications"
}
```

### 4. Xóa sách
```bash
DELETE http://localhost:8080/api/books/1
```

## 🎨 Design Features

### Màu sắc chủ đạo
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)
- **Accent**: #ec4899 (Pink)

### Hiệu ứng đặc biệt
- ✨ Gradient backgrounds
- 🌊 Floating animations
- 🎯 Smooth transitions
- 📱 Fully responsive
- 🌓 Dark mode support
- 💫 Micro-interactions

## 🔧 Troubleshooting

### Lỗi Lombok không được nhận diện
Nếu IDE báo lỗi Lombok, hãy:
1. **IntelliJ IDEA**: 
   - Install Lombok plugin
   - Enable annotation processing: Settings → Build → Compiler → Annotation Processors
   
2. **Eclipse**: 
   - Download lombok.jar
   - Run: `java -jar lombok.jar`
   - Select Eclipse installation

3. **VS Code**:
   - Install "Language Support for Java" extension
   - Maven sẽ tự động download dependencies

### Port 8080 đã được sử dụng
Thêm vào `src/main/resources/application.properties`:
```properties
server.port=8081
```

## 📚 Tài liệu tham khảo
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Lombok Documentation](https://projectlombok.org/)
- [Spring Web MVC](https://docs.spring.io/spring-framework/reference/web/webmvc.html)

## 👨‍💻 Phát triển thêm

### Các tính năng có thể mở rộng:
- [ ] Thêm database (H2, MySQL, PostgreSQL)
- [ ] Thêm Spring Data JPA
- [ ] Authentication & Authorization (Spring Security)
- [ ] Pagination & Sorting
- [ ] Search & Filter
- [ ] File upload (Book cover images)
- [ ] Export to PDF/Excel
- [ ] REST API documentation (Swagger/OpenAPI)

## 📄 License
This project is created for educational purposes.

---
**Made with ❤️ using Spring Boot 4.0.2**
