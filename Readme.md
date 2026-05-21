# ⚡ OwnBackend — Backend as a Service (BaaS)

**Live:** `<!-- https://minibaas.shubhankarmarathe.online -->`

A self-built **Backend as a Service (BaaS)** — give your app a full backend in minutes. Project-based auth, file storage, user data management, and Google OAuth, all behind a single project ID.

> Built from scratch to understand how platforms like Firebase and Supabase work under the hood.

---

## ✨ Features

| Module                   | What it does                                                         |
| ------------------------ | -------------------------------------------------------------------- |
| 🔐 **Master Auth**       | Developer register/login with access + refresh token system          |
| 📁 **Project System**    | Create isolated projects per app, each with a unique project ID      |
| 👤 **Project User Auth** | Register, login, update, delete — flexible field + identifier config |
| 🔄 **Token System**      | Separate access + refresh token pairs for master and project users   |
| 🔑 **OAuth**             | Validate Google ID tokens server-side, get user identity             |
| 🗂️ **User Data**         | Store and retrieve arbitrary JSON data per project user              |
| 📦 **File Storage**      | Upload files to AWS S3, get signed URLs, delete files                |

---

## 🏗️ Architecture

```
Developer → Master Signup/Login → Access + Refresh Token cookies
                                               ↓
                              POST /project/createproject → Get ProjectId
                                               ↓
                              Your App → ProjectId in URL params
                                               ↓
                                    ┌──────────────────────────┐
                                    │       OwnBackend API      │
                                    ├──────────────────────────┤
                                    │  Master Auth Module       │
                                    │  Project Module           │
                                    │  Project User Auth Module │
                                    │  Project Token Module     │
                                    │  User Data Module         │
                                    │  File Upload Module       │
                                    │  OAuth Module             │
                                    └──────────────────────────┘
                                               ↓
                                  MongoDB · Redis · AWS S3
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) runtime
- MongoDB (Atlas or local)
- Redis instance
- AWS Account (S3 bucket)

### Installation

```bash
git clone https://github.com/shubhankarmarathe-11/Own_Backend_Software.git
cd Own_Backend_Software/Backend
bun install
```

### Environment Variables

Create a `.env` file in `/Backend`:

```env
PORT=3002
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_url

JWT_SECRET=your_jwt_secret
JWT_ISSUER=your_issuer
JWT_AUDIENCE=your_audience

AWS_REGION=eu-north-1
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
AWS_BUCKET=your_bucket_name

GOOGLE_CLIENT_ID=your_google_client_id
```

### Run

```bash
bun start    # runs with nodemon (hot reload)
```

---

## 📡 API Reference

All routes are prefixed with `/api`.

---

### 🔐 Master Auth

For developers managing their BaaS account and projects.

| Method | Endpoint         | Auth             | Description                                 |
| ------ | ---------------- | ---------------- | ------------------------------------------- |
| POST   | `/master/signup` | —                | Register as a developer                     |
| POST   | `/master/login`  | —                | Login → sets access + refresh token cookies |
| POST   | `/master/oauth`  | —                | Login via Google OAuth                      |
| POST   | `/master/logout` | 🍪 Refresh token | Logout and clear cookies                    |
| DELETE | `/master/delete` | 🍪 Refresh token | Delete developer account                    |

**Signup request body:**

```json
{
  "name": "John Doe",
  "email": "dev@example.com",
  "password": "Abcd@1234"
}
```

**Login request body:**

```json
{
  "email": "dev@example.com",
  "password": "Abcd@1234"
}
```

**Response:** Sets `host_auth_access` (1h) and `host_auth_refresh` (7d) as HTTP-only cookies. Developer session cached in Redis.

---

### 📁 Project Management

> 🔒 All routes require master access + refresh token cookies.

| Method | Endpoint                               | Description                               |
| ------ | -------------------------------------- | ----------------------------------------- |
| POST   | `/project/createproject`               | Create a new project                      |
| GET    | `/project/getprojects`                 | List all your projects                    |
| GET    | `/project/getprojectdetail/:projectId` | Get a single project's details            |
| DELETE | `/project/deleteproject/:projectId`    | Delete a project                          |
| POST   | `/project/fetchprojectuser`            | Get a project user's details by `PuserId` |

**Create project:**

```json
{ "projectName": "My App" }
```

**Fetch project user:**

```json
{ "PuserId": "64fc1b2abc..." }
```

---

### 👤 Project User Auth

> Uses `:projectId` in the URL. For your app's end users — no master token needed.

| Method | Endpoint                           | Auth                     | Description                             |
| ------ | ---------------------------------- | ------------------------ | --------------------------------------- |
| POST   | `/projectauth/register/:projectId` | —                        | Register a user under your project      |
| POST   | `/projectauth/login/:projectId`    | —                        | Login → returns access + refresh tokens |
| PATCH  | `/projectauth/update/:projectId`   | 🍪 Project refresh token | Update user auth data                   |
| DELETE | `/projectauth/delete/:projectId`   | 🍪 Project refresh token | Remove user from project                |

**Register:**

```json
{
  "AuthData": {
    "Email": "user@example.com",
    "Name": "John",
    "UserName": "john_doe",
    "Password": "Abcd@1234",
    "Phone": "9876543210",
    "Identifiers": ["Email"]
  }
}
```

> Only include fields you need. `Identifiers` defines which fields are used as login keys — e.g. `["Email"]`, `["UserName"]`, or `["Email", "UserName"]`.

**Field validation rules:**

| Field      | Rule                                                            |
| ---------- | --------------------------------------------------------------- |
| `Email`    | Valid email format                                              |
| `Name`     | Letters only, 2–50 chars                                        |
| `UserName` | Letters, numbers, `_` or `.` — 3–20 chars, no spaces            |
| `Password` | Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char |
| `Phone`    | 10-digit Indian mobile (optional `+91` or `0` prefix)           |

**Login:**

```json
{
  "LoginAuthData": {
    "Email": "user@example.com",
    "Password": "Abcd@1234",
    "Identifiers": ["Email"]
  }
}
```

**Login response:**

```json
{
  "res": "User Found. RefreshToken - <token> \n AccessToken - <token>"
}
```

> Store both tokens. Use the refresh token to generate a new access token when it expires via `/projecttoken/generate/accesstoken`.

**Update:**

```json
{
  "AuthData": {
    "Email": "new@example.com",
    "Password": "NewPass@5678",
    "Identifiers": ["Email"],
    "PrevIdentifiers": ["Email"]
  }
}
```

> `PrevIdentifiers` is required — tells the server which old identifier fields to replace. `PuserId` is extracted from the refresh token automatically.

**Delete:**

> Send request with project refresh token cookie. `PuserId` extracted from token.

---

### 🔄 Project Token

| Method | Endpoint                             | Auth                     | Description                         |
| ------ | ------------------------------------ | ------------------------ | ----------------------------------- |
| POST   | `/projecttoken/generate/accesstoken` | 🍪 Project refresh token | Generate a new project access token |

> Call this when the project access token expires. Returns a new `host_project_auth_access` cookie.

---

### 🗂️ User Data

> 🔒 Requires project refresh token cookie. `PuserId` extracted from token automatically.

| Method | Endpoint                          | Description                     |
| ------ | --------------------------------- | ------------------------------- |
| POST   | `/projectdata/add/:projectId`     | Insert JSON data for a user     |
| GET    | `/projectdata/retrive/:projectId` | Retrieve stored data for a user |

**Add data:**

```json
{
  "UserData": {
    "theme": "dark",
    "score": 1250
  }
}
```

> Payload must be wrapped inside `UserData` key. Any valid JSON is accepted.

---

### 📦 File Upload

> 🔒 Requires project refresh token cookie. `PuserId` extracted from token automatically.

| Method | Endpoint                                 | Description                         |
| ------ | ---------------------------------------- | ----------------------------------- |
| POST   | `/uploadfile/upload/:projectId`          | Upload a file (multipart/form-data) |
| GET    | `/uploadfile/fetchall/:projectId`        | List all file keys for a user       |
| GET    | `/uploadfile/getfileurl/:projectId/:key` | Get a signed S3 URL for a file      |
| DELETE | `/uploadfile/deletefile/:projectId/:key` | Delete a file from S3               |

**Upload (multipart/form-data):**

```js
const formData = new FormData();
formData.append("file", file); // field name must be "file"

fetch("/api/uploadfile/upload/:projectId", {
  method: "POST",
  body: formData,
  credentials: "include", // sends cookies
});
```

**Fetch all keys response:**

```json
{ "keys": ["uploads/abc123.jpg", "uploads/doc456.pdf"] }
```

**Get signed URL response:**

```json
{ "url": "https://s3.amazonaws.com/...?X-Amz-Signature=..." }
```

> Signed URLs expire after 1 hour. Files are private on S3 — never publicly accessible.

---

### 🔑 OAuth

| Method | Endpoint                          | Auth | Description                                   |
| ------ | --------------------------------- | ---- | --------------------------------------------- |
| POST   | `/oauth/validatetoken/:projectId` | —    | Validate a Google ID token for a project user |

**Request:**

```json
{
  "google_token": "eyJhbGciOiJSUzI1NiIs...",
  "GOOGLE_CLIENT_ID": "your_google_client_id"
}
```

**Response:**

```json
{
  "data": {
    "Email": "user@gmail.com",
    "Name": "John Doe",
    "googleId": "1234567890",
    "profileurl": "https://lh3.googleusercontent.com/..."
  }
}
```

> Get the Google ID token client-side using [Google Identity Services](https://developers.google.com/identity/gsi/web), then pass it here for server-side validation.

---

## 🛠️ Tech Stack

|                 |                                                      |
| --------------- | ---------------------------------------------------- |
| **Runtime**     | Bun                                                  |
| **Language**    | TypeScript                                           |
| **Framework**   | Express v5                                           |
| **Database**    | MongoDB + Mongoose                                   |
| **Cache**       | Redis (ioredis)                                      |
| **Storage**     | AWS S3 (`@aws-sdk/client-s3`)                        |
| **Auth**        | JWT HS256 (jose) + bcryptjs + refresh token rotation |
| **OAuth**       | google-auth-library                                  |
| **File Upload** | Multer (memory storage → S3)                         |

---

## 📌 Project Status

🚧 **Under Active Development** — dashboard UI and JS SDK coming next.

---

## 📄 License

MIT © [Shubhankar Marathe](https://github.com/shubhankarmarathe-11)
