# 📘 Blog API

A RESTful Blog API built as part of The Odin Project curriculum.  
This project focuses on building a complete backend system with authentication, authorization, and CRUD operations.

---

## 🚀 Features

- User authentication (JWT)
- Admin authorization
- Create, read, update posts
- Comment system
- Publish / unpublish posts (admin only)
- Protected routes

---

## 🧱 Tech Stack

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT (Authentication) with PassportJs
- Multer (file upload)
- Cloudinary 

---

## 📂 API Endpoints

### Users
- `POST /api/users` → Sign up  
- `POST /api/users/me` → Get current user  

### Auth
- `POST /api/auth/profile` → Login  
- `POST /api/auth/logout` → Logout  
- `POST /api/auth/refresh` → Refresh token  

### Posts
- `GET /api/posts` → Get all posts  
- `GET /api/posts/:postId` → Get single post  
- `POST /api/posts/:postId/comments` → Add comment  

### Admin
- `POST /api/admin/auth` → Admin login  
- `GET /api/admin/posts` → Get all posts  
- `POST /api/posts` → Create post  
- `PATCH /api/admin/posts/:postId` → Publish / unpublish  
- `DELETE /api/posts/:postId/comments/:commentId` → Delete comment  


## Acknowledgments
I would like to extend my heartfelt thanks to augustynd02 for their inspiring work