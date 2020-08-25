// to add authentication, validation or any other custom behaviour, the module-approach can be used
// json-server uses express and it can be customized using any other express middlewares
// https://github.com/typicode/json-server#module

// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('json-server-simple/database.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})


