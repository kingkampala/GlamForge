# GlamForge API
Elevate your e-commerce game with GlamForge, a robust Node.js API designed to craft seamless, user-friendly, and sophisticated shopping experiences.


### Overview
GlamForge API provides a powerful backend foundation for e-commerce applications. It offers a range of endpoints to manage products, categories, users, orders, orderitems, carts and payments, facilitating a smooth and efficient shopping process. With GlamForge, developers can build feature-rich e-commerce platforms that deliver exceptional user experiences.


### Base URL
GlamForge API backend is hosted at:

`https://glam-forge.onrender.com`

This the base URL for the API, which is intended to be accessed by the application's frontend, not directly by users. It provides the foundation for e-commerce applications to manage products, categories, users, orders, orderitems, carts and payments, ensuring a smooth and efficient shopping process.


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


### Routes to test Endpoints
This section provides the routes to test specific endpoints.

**Users**

```
POST     /users/register        user registration
POST     /users/login           user login
POST     /users                 add user
GET      /users                 get users
GET      /users/:id             get specific user
GET      /users/total           get total users
PUT      /users/:id             update user
DELETE   /users/:id             delete user
```

**Products**

```
POST     /products                      add product
GET      /products                      get products
GET      /products/:id                  get specific product
GET      /products/total                get total products
GET      /products/total-featured       get total featured products
PUT      /products/:id                  update product
DELETE   /products/:id                  delete product
```

**Orders**

```
POST     /orders                      add order
GET      /orders                      get orders
GET      /orders/:id                  get specific order
PUT      /orders/:id                  update order
DELETE   /orders/:id                  delete order
```

**Categories**

```
POST     /categories                      add category
GET      /categories                      get categories
GET      /categories/:id                  get specific category
PUT      /categories/:id                  update category
DELETE   /categories/:id                  delete category
```