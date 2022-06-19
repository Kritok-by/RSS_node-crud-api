# RSS Simple CRUD API

Small API with once endpont who supportes CRUD operations.
Used in-memory database.

# You can run

    1. npm run start:prod - bundle & started server (production mode)
    2. npm run start:dev - started server in development mode
    3. npm run start:multi - run server in multi poccess - development mode
    4. npm run test - run tests

# API specs

### Request

`GET /api/users`

### Response

`HTTP/1.1 200 OK`
`Content-Type: application/json`

`[{
  username: string,
  age: number,
  hobbies: string[]
}, ...]`

### Request

`GET /api/users/${userId}`

### Response

`HTTP/1.1 200 OK`
`Content-Type: application/json`

`{
  username: string,
  age: number,
  hobbies: string[]
}`

### Request

`POST /api/users`
`Content-Type: application/json`

`{`
`  Accept: application/json,`
`  Body: {`
  `  username: string, @required`
  `  age: number, @required`
  `  hobbies: string[] @required`
` }`
`}`

### Response

`HTTP/1.1 201 Created`
`Content-Type: application/json`

`{
  id: string as uuidv4,
  username: string,
  age: number,
  hobbies: string[]
}`

### Request

`PUT /api/users/${userId}`

`{`
`  Accept: application/json,`
`  Body: {`
  `  username: string, @required`
  `  age: number, @required`
  `  hobbies: string[] @required`
` }`
`}`

### Response

`HTTP/1.1 200 OK`
`Content-Type: application/json`

`{
  id: string as uuidv4,
  username: string,
  age: number,
  hobbies: string[]
}`

### Request

`DELETE /api/users/${userId}`

### Response

`HTTP/1.1 204 No Content`