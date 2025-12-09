## 🚀  Project API – Auth, Email, and Project Management

A structured API for managing **project creation, deletion, authentication (signup, login, logout, session checks), and email services (OTP and messaging)** for your web applications.

---

## 📂 Project Management

### 1️⃣ Create Project

**Endpoint:** `/api/CreateProject`

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

### 2️⃣ Delete Project

**Endpoint:** `/api/DeleteProject`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID"
  }
}
```

---

## 🔐 Authentication

### 1️⃣ Signup

**Endpoint:** `/api/Signup`

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

### 2️⃣ Login

**Endpoint:** `/api/Login`

```json
{
  "ProjectID": "YOUR_PROJECT_ID",
  "Options": {
    "EmailOrName": "user@example.com",
    "Password": "yourpassword"
  }
}
```

### 3️⃣ Session Check

**Endpoint:** `/api/IsActive`

```json
{
  "Token": "YOUR_JWT_TOKEN_HERE"
}
```

### 4️⃣ Logout

**Endpoint:** `/api/Logout`

```json
{
  "Token": "YOUR_JWT_TOKEN_HERE"
}
```

### Delete Account

**Endpoint:** `/api/DeleteAccount`

```json
{
  "Token": "YOUR_JWT_TOKEN_HERE"
}
```

### Reset Password

**Endpoint:** `/api/ForgetPassword`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "UserEmail": "YOUR_EMAIL_ID",
    "UpdatedPassword": "YOUR_NEW_PASSWORD"
  }
}
```

---

## 📧 Email Services

### 1️⃣ Send OTP

**Endpoint:** `/api/SendOTP`

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

### 2️⃣ Send Message

**Endpoint:** `/api/SendMessage`

```json
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

### 3️⃣ Verify OTP

**Endpoint:** `/api/CheckOTP`

```json
{
  "CheckOTP": 643546
}
```

---

## 🗂️ Data Management

### Insert Data

**Endpoint:** `/api/InsertData`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "Token": "YOUR_JWT_TOKEN_HERE",
    "Data": "Hello, I am a demo data."
  }
}
```

### Delete Data

**Endpoint:** `/api/DeleteData`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "Token": "YOUR_JWT_TOKEN_HERE",
    "Data_id": "YOUR_DATA_ID"
  }
}
```

### Retrieve Data

**Endpoint:** `/api/RetriveData`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "Token": "YOUR_JWT_TOKEN_HERE"
  }
}
```

### Update Data

**Endpoint:** `/api/UpdateData`

```json
{
  "Options": {
    "ProjectID": "YOUR_PROJECT_ID",
    "Token": "YOUR_JWT_TOKEN_HERE",
    "Data_id": "YOUR_DATA_ID",
    "Data": "Hello, I am a new data."
  }
}
```

---

### 🛠️ Notes

✅ Replace placeholders such as `YOUR_PROJECT_ID`, `user@example.com`, and `YOUR_JWT_TOKEN_HERE` with your actual values during implementation.

✅ You will receive your `PROJECT_ID` when you create a project and your `JWT_Token` upon successful signup or login.

✅ Use a consistent `ProjectID` across your requests to align with your project environment.

✅ Supports **scalable SaaS authentication, email handling, and data management** with flexible extra fields for rapid MVP and product launches.

✅ The `Data` field can be any JSON-compatible type (array, object, string, number) but does not support files.

✅ Each data entry generates a unique `Data_id` for targeted operations.

```

```
