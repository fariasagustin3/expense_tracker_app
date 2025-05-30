## 📘 README – Expense Tracker App

### 📌 Project Overview

**Expense Tracker App** is a full-stack personal finance management application designed to help users track their income and expenses. It features an intuitive interface to log transactions, categorize them, and visualize financial activity using interactive bar charts and filtered tables by date.

This project is a **Minimum Viable Product (MVP)** built with **React** and **Spring Boot**, and containerized using **Docker** and **Docker Compose**.

---

### 💠 Tech Stack

#### Frontend

* React
* TypeScript
* TailwindCSS
* Zustand (state management)
* Axios
* React Router DOM
* Recharts (data visualization)

#### Backend

* Java + Spring Boot
* Spring Security (with JWT authentication)
* Spring Data JPA
* PostgreSQL
* Lombok
* Swagger (API documentation)

---

### 🚀 Getting Started

#### Prerequisites

* Docker & Docker Compose installed

#### Project Structure

```
.
├── client      # React frontend
└── server      # Spring Boot backend
```

#### Running the Backend

1. Navigate to the `/server` directory:

   ```bash
   cd server
   ```
2. Run the backend services:

   ```bash
   docker-compose up
   ```

> This will start the Spring Boot application and the PostgreSQL database.

#### Running the Frontend

1. Navigate to the `/client` directory:

   ```bash
   cd client
   ```
2. Build the Docker image:

   ```bash
   docker build -t react-client .
   ```
3. Run the container:

   ```bash
   docker run -p 5173:80 react-client
   ```

> The application will be accessible at `http://localhost:5173`.

---

### 📦 Features

* ✅ Register & login using JWT-based authentication
* ✅ Add new income and expense transactions
* ✅ Filter transactions by date
* ✅ Visualize spending habits using bar charts (Recharts)
* ✅ Monthly report endpoint available via the API
* ✅ Swagger UI documentation available at `http://localhost:8080/swagger-ui/index.html`

---

### 📡 API Endpoints

The backend provides the following endpoints (via `/api/v1/`):

* **Authentication**: `/auth/register`, `/auth/login`
* **Users**: `/users`, `/users/{id}`, `/users/{email}`
* **Transactions**: CRUD operations
* **Categories**: CRUD operations
* **Reports**: `/reports/monthly`

📚 Full documentation available at `/swagger-ui/index.html`

---

### 🔧 Roadmap & TODOs

* [ ] Edit/delete transactions
* [ ] Delete user accounts
* [ ] Download transactions/reports as Excel
* [ ] Delete categories
* [ ] Form validation for login/register
* [ ] Feedback toggles for creation/update/delete actions
* [ ] Improve backend error handling with descriptive messages

---

### 🧪 Testing

> ⚠️ Testing is not implemented yet, but is planned for future development using JUnit and integration tests for the backend.

---

### 📸 Screenshots

> *(Coming soon)*
> You will find here some screenshots of the application in action.

---

### 🤝 Contributing

This is a personal project, but contributions or suggestions are welcome!

---

### 📄 License

This project is open source and available under the [MIT License](LICENSE).
