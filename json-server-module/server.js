// to add authentication, validation or any other custom behaviour, the module-approach can be used
// json-server uses express and it can be customized using any other express middlewares
// https://github.com/typicode/json-server#module

// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()

// comment from: https://github.com/typicode/json-server#module
// The path you provide to the jsonServer.router function is relative to the directory from where you launch your node process.
// If you run the above code from another directory, it’s better to use an absolute path:
const path = require('path')
const router = jsonServer.router(path.join(__dirname, '../json-server-simple/database.json'))


// Set default middlewares (logger, static, cors and no-cache)
// See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
    // Display json-server's built in homepage when json-server starts.
    static: "node_modules/json-server/public",
});
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

