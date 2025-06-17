# Hướng dẫn cài đặt DNA Testing Service

## 1. Yêu cầu hệ thống
- Windows 10 trở lên
- JDK 17
- Node.js (LTS version)
- Docker Desktop
- IDE (IntelliJ IDEA hoặc VS Code)

## 2. Cài đặt môi trường

### 2.1. Cài đặt JDK 17
1. Tải JDK 17 từ: https://www.oracle.com/java/technologies/downloads/#java17
2. Chạy file cài đặt
3. Kiểm tra: `java -version`

### 2.2. Cài đặt Node.js
1. Tải Node.js LTS từ: https://nodejs.org/
2. Chạy file cài đặt với quyền Administrator
3. Tích chọn "Automatically install the necessary tools..."
4. Khởi động lại máy tính
5. Kiểm tra: `node --version` và `npm --version`

### 2.3. Cài đặt Docker Desktop
1. Tải Docker Desktop từ: https://www.docker.com/products/docker-desktop
2. Chạy file cài đặt với quyền Administrator
3. Tích chọn "Use WSL 2 instead of Hyper-V"
4. Khởi động lại máy tính
5. Kiểm tra: `docker --version`

## 3. Cài đặt dự án

### 3.1. Clone dự án

    tải và dùng github desktop

### 3.2. Cài đặt và chạy với Docker
1. Tạo file `docker-compose.yml`:
```yaml
version: '3.8'

services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: dna_test_db
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=Aa@123456
      - MSSQL_PID=Developer
    ports:
      - "1435:1433"
    volumes:
      - sqlserver_data:/var/opt/mssql
    networks:
      - dna_network

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    container_name: dna_test_backend
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:sqlserver://sqlserver:1433;databaseName=dna_test_db;encrypt=true;trustServerCertificate=true
      - SPRING_DATASOURCE_USERNAME=sa
      - SPRING_DATASOURCE_PASSWORD=Aa@123456
    depends_on:
      - sqlserver
    networks:
      - dna_network

  frontend:
    build:
      context: ./dna-testing-frontend
      dockerfile: Dockerfile.frontend
    container_name: dna_test_frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8080
    depends_on:
      - backend
    networks:
      - dna_network

volumes:
  sqlserver_data:

networks:
  dna_network:
    driver: bridge
```

2. Tạo file `Dockerfile.backend`:
```dockerfile
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

3. Tạo file `dna-testing-frontend/Dockerfile.frontend`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

4. Khởi động hệ thống:
```bash
docker-compose up -d --build
```

5. Kiểm tra các container:
```bash
docker-compose ps
```

## 4. Truy cập ứng dụng
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

