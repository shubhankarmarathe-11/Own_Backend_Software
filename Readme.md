## 🚀 SaaS Project API – Auth, Email, and Project Management

A structured API for managing **project creation, deletion, authentication (signup, login, logout, session check), and email services (OTP and messaging)** in your SaaS applications.

---

## 📂 Project Management

### 1️⃣ Create Project

```json

API - "/api/CreateProject"

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

### 2️⃣ Delete Project

```json

API - "/api/DeleteProject"

{
  "Options": {
    "ProjectID": "686fa610c34e6807d1dfae8f"
  }
}
```

---

## 🔐 Auth Properties

### 1️⃣ Signup

```json

API - "/api/Signup"

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

### 2️⃣ Login

```json

API - "/api/Login"

{
  "ProjectID": "YOUR_PROJECT_ID",
  "Options": {
    "EmailOrName": "user@example.com",
    "Password": "yourpassword"
  }
}
```

### 3️⃣ Session Check

```json

API - "/api/IsActive"

{
  "Token": "YOUR_JWT_TOKEN_HERE"
}
```

### 4️⃣ Logout

```json

API - "/api/Logout"

{
  "Token": "YOUR_JWT_TOKEN_HERE"
}
```

---

## 📧 Email Properties

### 1️⃣ Send OTP

```json

API - "/api/SendOTP"

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

### 2️⃣ Send Message

```json

API - "/api/SendMessage"

{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "EmailInfo": {
      "UserEmail": "user@example.com",
      "Subject": "Subject of the Message",
      "Para": "This is a test message from the project."
    }
  }
}
```

### 3️⃣ Check OTP

```json

API - "/api/CheckOTP"

{
  "CheckOTP": 643546
}
```

---

## 🛠️ Notes

✅ Replace placeholders such as `YOUR_PROJECT_ID`, `user@example.com`, and `YOUR_JWT_TOKEN_HERE` with your actual values during implementation.

✅ You get Your `PROJECT_ID` as you Create Project And `JWT_Token` When you Signup/Login .

✅ Use consistent `ProjectID` across your requests to align with your project's environment.

✅ Supports **scalable SaaS authentication and email handling** with flexible extra fields and preferences for rapid MVP and product launches.

---
