# 🚀 SaaS Authentication & Utility API (BaaS)

A scalable **Backend-as-a-Service (BaaS)** API that provides **project-based authentication, email services (OTP & messaging), and generic data management**.  
Designed to help developers quickly integrate **ready-made backend features** into their SaaS and web applications.

---

## ✨ Key Features

- 🔐 Multi-project authentication system
- 👤 User signup, login, logout & session validation
- 🔑 JWT-based security
- 📧 Built-in email services (OTP verification & messaging)
- 🗂️ Generic data storage with CRUD operations
- ⚙️ Configurable project preferences & extra fields
- 🚀 Ideal for SaaS apps, MVPs, and startups

---

## 📂 Project Management

### ➕ Create Project

**Endpoint:** `POST /api/createproject`

```json
{
  "Options": {
    "ProjectName": "Your Project Name",
    "ProjectPref": {
      "Email": true,
      "Password": true
    },
    "ExtraField": {
      "Username": true,
      "MobileNo": false,
      "Address": false
    },
    "ExtraServices": {
      "MailService": true
    }
  }
}
```

---

### ❌ Delete Project

**Endpoint:** `DELETE /api/deleteproject`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID"
  }
}
```

---

## 🔐 Authentication

### 📝 Signup

**Endpoint:** `POST /api/signup`

```json
{
  "ProjectID": "YOUR_PROJECT_ID",
  "Options": {
    "ProjectPreferences": {
      "Email": "user@example.com",
      "Password": "yourpassword"
    },
    "ExtraFields": {
      "Username": "username123"
    }
  }
}
```

---

### 🔑 Login

**Endpoint:** `POST /api/login`

```json
{
  "ProjectID": "YOUR_PROJECT_ID",
  "Options": {
    "EmailOrName": "user@example.com",
    "Password": "yourpassword"
  }
}
```

---

### ✅ Session Check

**Endpoint:** `POST /api/isactive`

```json
{
  "Token": "YOUR_JWT_TOKEN"
}
```

---

### 🚪 Logout

**Endpoint:** `POST /api/logout`

```json
{
  "Token": "YOUR_JWT_TOKEN"
}
```

---

### 🗑️ Delete Account

**Endpoint:** `DELETE /api/deleteaccount`

```json
{
  "Token": "YOUR_JWT_TOKEN"
}
```

---

### 🔄 Reset Password

**Endpoint:** `POST /api/forgetpassword`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "UserEmail": "user@example.com",
    "UpdatedPassword": "newpassword"
  }
}
```

---

## 📧 Email Services

### 🔢 Send OTP

**Endpoint:** `POST /api/sendotp`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "EmailInfo": {
      "UserEmail": "user@example.com",
      "Subject": "OTP Verification",
      "Para": ""
    }
  }
}
```

---

### ✉️ Send Message

**Endpoint:** `POST /api/sendmessage`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "EmailInfo": {
      "UserEmail": "user@example.com",
      "Subject": "Message Subject",
      "Para": "This is a test message from the project."
    }
  }
}
```

---

### ✔️ Verify OTP

**Endpoint:** `POST /api/checkotp`

```json
{
  "CheckOTP": 643546
}
```

---

## 🗂️ Data Management

### ➕ Insert Data

**Endpoint:** `POST /api/insertdata`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "Token": "YOUR_JWT_TOKEN",
    "Data": "Hello, I am a demo data."
  }
}
```

---

### 📥 Retrieve Data

**Endpoint:** `POST /api/retrivedata`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "Token": "YOUR_JWT_TOKEN"
  }
}
```

---

### ✏️ Update Data

**Endpoint:** `PUT /api/updatedata`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "Token": "YOUR_JWT_TOKEN",
    "Data_id": "YOUR_DATA_ID",
    "Data": "Hello, I am a new data."
  }
}
```

---

### 🗑️ Delete Data

**Endpoint:** `DELETE /api/deletedata`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "Token": "YOUR_JWT_TOKEN",
    "Data_id": "YOUR_DATA_ID"
  }
}
```

---

## 🛠️ Notes

- Replace placeholders like `YOUR_PROJECT_ID` and `YOUR_JWT_TOKEN` with actual values
- `ProjectID` is generated during project creation
- JWT token is returned after successful signup or login
- Supports all JSON-compatible data types (except files)
- Each data entry generates a unique `Data_id`

---

## 🎯 Use Cases

- SaaS authentication service
- Startup MVP backend
- Backend-as-a-Service (BaaS)
- Multi-project authentication platform

---

## 🚧 Project Status

This project is under active development.

---

💡 **This API is built to save development time and help teams focus on building products instead of backend boilerplate.**
