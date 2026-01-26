# API Test Commands - Quick Reference

## PowerShell Commands (Windows)

### 1. GET All Books
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/books" -Method Get
```

### 2. GET Book by ID
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/books/1" -Method Get
```

### 3. POST Create New Book
```powershell
$body = @{
    title = "Spring Boot in Action"
    author = "Craig Walls"
    edition = 3
    publisher = "Manning Publications"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/books" -Method Post -Body $body -ContentType "application/json"
```

### 4. POST Create Book - Example 2
```powershell
$body = @{
    title = "Clean Code"
    author = "Robert C. Martin"
    edition = 1
    publisher = "Prentice Hall"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/books" -Method Post -Body $body -ContentType "application/json"
```

### 5. POST Create Book - Example 3
```powershell
$body = @{
    title = "Effective Java"
    author = "Joshua Bloch"
    edition = 3
    publisher = "Addison-Wesley"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/books" -Method Post -Body $body -ContentType "application/json"
```

### 6. PUT Update Book
```powershell
$body = @{
    title = "Spring Boot in Action - Updated Edition"
    author = "Craig Walls"
    edition = 4
    publisher = "Manning Publications Co."
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/books/1" -Method Put -Body $body -ContentType "application/json"
```

### 7. DELETE Book
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/books/1" -Method Delete
```

---

## cURL Commands (Cross-platform)

### 1. GET All Books
```bash
curl http://localhost:8080/api/books
```

### 2. GET Book by ID
```bash
curl http://localhost:8080/api/books/1
```

### 3. POST Create New Book
```bash
curl -X POST http://localhost:8080/api/books ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Spring Boot in Action\",\"author\":\"Craig Walls\",\"edition\":3,\"publisher\":\"Manning Publications\"}"
```

### 4. POST Create Book - Example 2
```bash
curl -X POST http://localhost:8080/api/books ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Clean Code\",\"author\":\"Robert C. Martin\",\"edition\":1,\"publisher\":\"Prentice Hall\"}"
```

### 5. POST Create Book - Example 3
```bash
curl -X POST http://localhost:8080/api/books ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Effective Java\",\"author\":\"Joshua Bloch\",\"edition\":3,\"publisher\":\"Addison-Wesley\"}"
```

### 6. PUT Update Book
```bash
curl -X PUT http://localhost:8080/api/books/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Spring Boot in Action - Updated\",\"author\":\"Craig Walls\",\"edition\":4,\"publisher\":\"Manning Publications Co.\"}"
```

### 7. DELETE Book
```bash
curl -X DELETE http://localhost:8080/api/books/1
```

---

## Quick Test Script (PowerShell)

Copy và paste vào PowerShell để test tất cả:

```powershell
Write-Host "=== Testing Book Management API ===" -ForegroundColor Green

# 1. Create Book 1
Write-Host "`n1. Creating Book 1..." -ForegroundColor Yellow
$book1 = @{
    title = "Spring Boot in Action"
    author = "Craig Walls"
    edition = 3
    publisher = "Manning Publications"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8080/api/books" -Method Post -Body $book1 -ContentType "application/json"

# 2. Create Book 2
Write-Host "`n2. Creating Book 2..." -ForegroundColor Yellow
$book2 = @{
    title = "Clean Code"
    author = "Robert C. Martin"
    edition = 1
    publisher = "Prentice Hall"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8080/api/books" -Method Post -Body $book2 -ContentType "application/json"

# 3. Create Book 3
Write-Host "`n3. Creating Book 3..." -ForegroundColor Yellow
$book3 = @{
    title = "Effective Java"
    author = "Joshua Bloch"
    edition = 3
    publisher = "Addison-Wesley"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8080/api/books" -Method Post -Body $book3 -ContentType "application/json"

# 4. Get All Books
Write-Host "`n4. Getting all books..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:8080/api/books" -Method Get

# 5. Get Book by ID
Write-Host "`n5. Getting book with ID=1..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:8080/api/books/1" -Method Get

# 6. Update Book
Write-Host "`n6. Updating book with ID=1..." -ForegroundColor Yellow
$updateBook = @{
    title = "Spring Boot in Action - Updated"
    author = "Craig Walls"
    edition = 4
    publisher = "Manning Publications Co."
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8080/api/books/1" -Method Put -Body $updateBook -ContentType "application/json"

# 7. Delete Book
Write-Host "`n7. Deleting book with ID=3..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:8080/api/books/3" -Method Delete

# 8. Get All Books Again
Write-Host "`n8. Getting all books after delete..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:8080/api/books" -Method Get

Write-Host "`n=== Test Complete! ===" -ForegroundColor Green
```

---

## Expected Results

### After running the script:
1. ✅ 3 books created (IDs: 1, 2, 3)
2. ✅ All books retrieved
3. ✅ Book 1 retrieved by ID
4. ✅ Book 1 updated (edition changed to 4)
5. ✅ Book 3 deleted
6. ✅ Final list shows 2 books (IDs: 1, 2)
