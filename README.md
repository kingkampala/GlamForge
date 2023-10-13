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


### Installation
Follow these steps to set up the project locally and run the API on your machine.

**Prerequisites**

Make sure you have the following software installed on your machine:

* Node.js (v12.0.0 or higher)
* npm (v6.0.0 or higher)
* MongoDB (v4.0.0 or higher) - Ensure MongoDB server is running.

**Clone the Repository**

Clone the repository to your local machine using the following command:

`git clone https://github.com/kingkampala/GlamForge.git`

**Install Dependencies**

Navigate to the project directory and install the necessary dependencies using npm:

`npm install`

**Configure Environment Variables**

Create a `.env` file in the root of the project and set the required environment variables. For example:

```
MONGO_URI
JWT_SECRET
STRIPE_KEY
```
_assign the respective values of the environment variables_

**Run the API**

Start the API server using the following command:

`npm start`

The API will run at your specified port.

**Access the API**

You can now access the API using an API testing tool like Postman or Insomnia at your base URL http://localhost:${port}.


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

Test Case

POST     /users/register                                                   POST     /users/login
{                                                                          {
  "name": "Dwayne Brook",                                                    "email": "dwayne@brook.com",
  "email": "dwayne@brook.com",                                               "username": "wayne rook",
  "username": "wayne rook",                                                  "password": "Dwayne12345Brook"
  "password": "Dwayne12345Brook",                                          }
  "mySecret": "feel free, your deepest secret is safe here.",
  "phone": "+1435678902",
  "address": "1120 crescent avenue park, NY.",
  "city": "New York",
  "country": "United States"
}
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

Test Case

POST     /products
{
    "name": "V shirt",
    "brand": "Versace",
    "description": "top quality",
    "price": 149.99,
    "currency": "$",
    "category": "650abf513b555aa29e2d3ffb"(category id),
    "quantity": 3,
    "featured": true or false
}
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

**Orderitems**

```
POST     /orderitems                      add orderitem
GET      /orderitems                      get orderitems
GET      /orderitems/:id                  get specific orderitem
PUT      /orderitems/:id                  update orderitem
DELETE   /orderitems/:id                  delete orderitem
```

**Carts**

```
POST     /carts                      add to cart
GET      /carts                      get cart
GET      /carts/total                get total cart
DELETE   /carts/:id                  delete specific cart
DELETE   /carts/clear                delete all cart
```
_carts routes and endpoints are still under minor construction..._

**Payments**

```
POST     /payments                   make payment
```


### Contribution
We welcome contributions to improve GlamForge and encourage you to submit issues and pull requests.

To submit an issue, please use the GitHub issue tracker and provide detailed information about the problem or enhancement.
If you'd like to contribute code:

* Fork the repository and create your branch from `main`.
* Make sure your code follows the existing code style and conventions.
* Issue a pull request with a detailed description of changes.


### License
GlamForge is distributed under the `ISC License`. See the `LICENSE.md` file for more information.


### Author
**Ezeanya Kampala**

* Github: `github.com/kingkampala`
* LinkedIn: `linkedin.com/in/kampala-ezeanya`