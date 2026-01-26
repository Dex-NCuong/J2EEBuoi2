# 📚 Hướng dẫn Test API với Postman

## 🚀 Cách Import Collection vào Postman

### Bước 1: Mở Postman
- Khởi động ứng dụng Postman trên máy tính

### Bước 2: Import Collection
1. Click nút **"Import"** ở góc trên bên trái
2. Chọn tab **"File"**
3. Click **"Upload Files"**
4. Chọn file: `Book-Management-API.postman_collection.json`
5. Click **"Import"**

### Bước 3: Sử dụng Collection
- Collection "Book Management API" sẽ xuất hiện trong sidebar
- Expand collection để xem tất cả 9 requests

---

## 📋 Kịch bản Test Đầy Đủ

### ✅ **Test Case 1: Tạo sách mới (POST)**

**Request**: `3. POST Create New Book`

**Kết quả mong đợi**:
- Status: `201 Created`
- Response body:
```json
{
  "id": 1,
  "title": "Spring Boot in Action",
  "author": "Craig Walls",
  "edition": 3,
  "publisher": "Manning Publications"
}
```

---

### ✅ **Test Case 2: Tạo thêm 2 sách nữa**

**Request**: 
- `4. POST Create Book - Example 2` (Clean Code)
- `5. POST Create Book - Example 3` (Effective Java)

**Kết quả**: Sẽ có ID = 2 và ID = 3

---

### ✅ **Test Case 3: Lấy tất cả sách (GET)**

**Request**: `1. GET All Books`

**Kết quả mong đợi**:
- Status: `200 OK`
- Response: Array chứa 3 sách
```json
[
  {
    "id": 1,
    "title": "Spring Boot in Action",
    "author": "Craig Walls",
    "edition": 3,
    "publisher": "Manning Publications"
  },
  {
    "id": 2,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "edition": 1,
    "publisher": "Prentice Hall"
  },
  {
    "id": 3,
    "title": "Effective Java",
    "author": "Joshua Bloch",
    "edition": 3,
    "publisher": "Addison-Wesley"
  }
]
```

---

### ✅ **Test Case 4: Lấy sách theo ID (GET)**

**Request**: `2. GET Book by ID`

**URL**: `http://localhost:8080/api/books/1`

**Kết quả mong đợi**:
- Status: `200 OK`
- Response: Thông tin sách có ID = 1

**Test thêm**:
- Thử với ID = 2, 3 (sẽ thành công)
- Thử với ID = 999 (sẽ trả về `404 Not Found`)

---

### ✅ **Test Case 5: Cập nhật sách (PUT)**

**Request**: `6. PUT Update Book`

**URL**: `http://localhost:8080/api/books/1`

**Body**:
```json
{
  "title": "Spring Boot in Action - Updated Edition",
  "author": "Craig Walls",
  "edition": 4,
  "publisher": "Manning Publications Co."
}
```

**Kết quả mong đợi**:
- Status: `200 OK`
- Response: Sách đã được cập nhật với edition = 4

**Verify**: Gọi lại `GET /api/books/1` để xem thay đổi

---

### ✅ **Test Case 6: Cập nhật sách khác (PUT)**

**Request**: `7. PUT Update Book - Example 2`

**URL**: `http://localhost:8080/api/books/2`

**Test thêm**:
- Thử update sách không tồn tại (ID = 999)
- Kết quả: `404 Not Found`

---

### ✅ **Test Case 7: Xóa sách (DELETE)**

**Request**: `8. DELETE Book by ID`

**URL**: `http://localhost:8080/api/books/3`

**Kết quả mong đợi**:
- Status: `204 No Content`
- Response body: Trống

**Verify**: 
- Gọi `GET /api/books` → Chỉ còn 2 sách (ID 1 và 2)
- Gọi `GET /api/books/3` → `404 Not Found`

---

### ✅ **Test Case 8: Xóa sách khác (DELETE)**

**Request**: `9. DELETE Book - Example 2`

**URL**: `http://localhost:8080/api/books/1`

**Test thêm**:
- Thử xóa sách đã xóa (ID = 3)
- Kết quả: `404 Not Found`

---

## 🎯 Quy trình Test Hoàn Chỉnh

### Scenario 1: CRUD Flow Cơ Bản
```
1. POST /api/books          → Tạo sách mới (ID = 1)
2. GET /api/books           → Xem danh sách (1 sách)
3. GET /api/books/1         → Xem chi tiết sách
4. PUT /api/books/1         → Cập nhật sách
5. GET /api/books/1         → Verify cập nhật
6. DELETE /api/books/1      → Xóa sách
7. GET /api/books           → Xem danh sách (0 sách)
```

### Scenario 2: Multiple Books
```
1. POST /api/books (3 lần)  → Tạo 3 sách (ID 1, 2, 3)
2. GET /api/books           → Xem tất cả (3 sách)
3. PUT /api/books/2         → Update sách giữa
4. DELETE /api/books/1      → Xóa sách đầu
5. DELETE /api/books/3      → Xóa sách cuối
6. GET /api/books           → Chỉ còn sách ID = 2
```

### Scenario 3: Error Handling
```
1. GET /api/books/999       → 404 Not Found
2. PUT /api/books/999       → 404 Not Found
3. DELETE /api/books/999    → 404 Not Found
4. POST /api/books (body rỗng) → 400 Bad Request
```

---

## 📊 Bảng Status Codes

| Method | Endpoint | Success | Error |
|--------|----------|---------|-------|
| GET | /api/books | 200 OK | - |
| GET | /api/books/{id} | 200 OK | 404 Not Found |
| POST | /api/books | 201 Created | 400 Bad Request |
| PUT | /api/books/{id} | 200 OK | 404 Not Found |
| DELETE | /api/books/{id} | 204 No Content | 404 Not Found |

---

## 🔍 Tips & Tricks

### 1. Kiểm tra Response Headers
- `Content-Type: application/json`
- `Transfer-Encoding: chunked`

### 2. Sử dụng Postman Tests
Thêm vào tab "Tests" của mỗi request:

**Cho POST request**:
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has id", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
});
```

**Cho GET request**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
});
```

### 3. Sử dụng Variables
Tạo environment variable:
- `base_url` = `http://localhost:8080`
- Thay URL thành: `{{base_url}}/api/books`

---

## 🐛 Troubleshooting

### Lỗi: "Could not get any response"
- ✅ Kiểm tra server đang chạy: `http://localhost:8080`
- ✅ Kiểm tra firewall/antivirus

### Lỗi: 404 Not Found
- ✅ Kiểm tra URL đúng: `/api/books` (không phải `/books`)
- ✅ Kiểm tra ID tồn tại

### Lỗi: 400 Bad Request
- ✅ Kiểm tra Content-Type header: `application/json`
- ✅ Kiểm tra JSON syntax đúng
- ✅ Kiểm tra không gửi `id` trong POST request

---

## 📱 Test với cURL (Alternative)

### GET All Books
```bash
curl http://localhost:8080/api/books
```

### POST Create Book
```bash
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spring Boot in Action",
    "author": "Craig Walls",
    "edition": 3,
    "publisher": "Manning"
  }'
```

### PUT Update Book
```bash
curl -X PUT http://localhost:8080/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "author": "Craig Walls",
    "edition": 4,
    "publisher": "Manning"
  }'
```

### DELETE Book
```bash
curl -X DELETE http://localhost:8080/api/books/1
```

---

## ✅ Checklist Test Hoàn Chỉnh

- [ ] Import Postman collection thành công
- [ ] POST: Tạo được sách mới
- [ ] GET: Lấy được danh sách tất cả sách
- [ ] GET: Lấy được sách theo ID
- [ ] PUT: Cập nhật được thông tin sách
- [ ] DELETE: Xóa được sách
- [ ] Error: Test các trường hợp lỗi (404, 400)
- [ ] Verify: Kiểm tra dữ liệu sau mỗi thao tác

---

**Happy Testing! 🚀**
