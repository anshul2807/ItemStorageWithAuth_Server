# My API

This API provides a Authentication system and all the CRUD operations for managing items.

## Getting Started (locally setup)

1. Before using the API, make sure to install the required dependencies: ``` npm install ```
2. Ensure that ```MySQL``` is installed; if not, download ```MySQL``` from the official website and install it. Afterward, start the server and remember to update the username and password in src/database.ts.
3. To start the server use the command : ```npm run dev```

> The server will be running on http://localhost:3000/

## Authentication

This API uses a simple token-based authentication system. Users must first register and then log in to get an access token.

### Register

    URL: /api/register

    Method: POST

    Request Body: Json
```ts
    {
      "username": "your_username",
      "password": "your_password"
    }
```

### Login

    URL: /api/login

    Method: POST

    Request Body: Json
```ts
{
  "username": "your_username",
  "password": "your_password"
}
```

Response: Json
```ts
    {
      "token": "your_access_token"
    }
```

Include the access token as a Bearer token in the Authorization header for all protected endpoints.

### Items

Create an Item

    URL: /api/items

    Method: POST

    Headers:

    Authorization: Bearer your_access_token


Request Body: Json
```js
    {
      "name": "Item name",
      "description": "Item description",
      "price": 100
    }
```

### Get All Items

    URL: /api/items

    Method: GET

    Headers:

    Authorization: Bearer your_access_token
    

### Get an Item by ID

    URL: /api/items/:id

    Method: GET

    Headers:

    Authorization: Bearer your_access_token
    

### Update an Item by ID

    URL: /api/items/:id

    Method: PUT

    Headers:

    Authorization: Bearer your_access_token


Request Body: Json
```js
    {
      "name": "Updated item name",
      "description": "Updated item description",
      "price": 200
    }
```
    

### Delete an Item by ID

    URL: /api/items/:id

    Method: DELETE

    Headers:

    Authorization: Bearer your_access_token
    

### Error Handling

The API provides error messages in the following format: Json
```js
{
  "error": "Error message"
}
```