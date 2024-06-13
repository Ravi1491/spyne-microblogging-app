# MicroBlogging App

This project implements a backend system with various functionalities for user management and discussion posts.

### Hosted Server Url

Url: https://spyne-microblogging-app.onrender.com

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [Low-Level Design](#low-level-design)
- [Postman Collection](#postman-collection)

## Features

### User Management

- Add users with fields: Name, Mobile No (unique), Email (unique)
- Login/Signup
- Search users by name
- Follow other users
- Update user details
- Delete users
- Show list of users

### Discussion Management

- Post a discussion with fields: Text, Image, Hashtags, Created On
- Update/Delete discussions
- Comment or like on posts
- Like or reply to comments
- Search posts by text or hashtags

### Functionalities

1. Users can login/signup.
2. Users can search for other users.
3. Users can follow other users.
4. Users can post (only text or Image + Text).
5. Other users can comment or like on posts.
6. Users can like a comment or reply on the comment.
7. Users can delete or modify posts.
8. Users can delete or modify comments.
9. Users can see the view count of a post.
10. Users can search for posts using hashtags.

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ravi1491/spyne-microblogging-app
   cd spyne-microblogging-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the required environment variables (e.g., database connection strings).

4. **Run the application**:
   ```bash
   npm run start:dev
   ```

## Database Schema

Database Schema: https://dbdiagram.io/d/Spyne-6668a8546bc9d447b170556a

## Low-Level Design

LLD Doc Link: https://docs.google.com/document/d/16JDaakuLjwyuK-trWAE8uhUHtZpvp15vHE_MFIsgRzw/edit?usp=sharing

## Postman Collection

For testing the APIs, a Postman collection has been created. You can import it using the following public link:

API Documentation or Postman Collection Link: https://www.postman.com/orange-robot-324607/workspace/spyne-microbloging-app
