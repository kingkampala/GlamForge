# GlamForge API
Elevate your e-commerce game with GlamForge, a robust Node.js API designed to craft seamless, user-friendly, and sophisticated shopping experiences.

### Overview
GlamForge API provides a powerful backend foundation for e-commerce applications. It offers a range of endpoints to manage products, categories, users, orders, and more, facilitating a smooth and efficient shopping process. With GlamForge, developers can build feature-rich e-commerce platforms that deliver exceptional user experiences.

### Base URL
GlamForge API backend is hosted at:

`https://glam-forge.onrender.com`

This the base URL for the API, which is intended to be accessed by the application's frontend, not directly by users. It provides the foundation for e-commerce applications to manage products, categories, users, orders, and more, ensuring a smooth and efficient shopping process.

### Authentication
The GlamForge API implements authentication using JSON Web Tokens (JWT). In order to access and test the API endpoints, an authentication token must be obtained through the following methods:

**Registration**

To register a new user, make a POST request to:

`https://glam-forge.onrender.com/users/register`

The request should include the user's information, and upon successful registration, a JWT token will be provided in the response.

**Login**

For user login, send a POST request to:

`https://glam-forge.onrender.com/users/login`

Include the user's login credentials. If authentication is successful, a JWT token will be provided in the response.

**Using the JWT Token**

Once obtained, in your testing tools, include the JWT token in the `Authorization` header of subsequent requests to authenticate and access protected endpoints.