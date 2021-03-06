// to add authentication, validation or any other custom behaviour, the module-approach can be used
// json-server uses express and it can be customized using any other express middlewares
// https://github.com/typicode/json-server#module

// for more information see
// https://github.com/typicode/json-server/blob/master/src/cli/run.js
// https://github.com/typicode/json-server/blob/master/src/server/defaults.js


const config = require("./json-server.json");
const jsonServer = require('json-server')
const server = jsonServer.create()

// comment from: https://github.com/typicode/json-server#module
// The path you provide to the jsonServer.router function is relative to the directory from where you launch your node process.
// If you run the above code from another directory, it’s better to use an absolute path:
const path = require('path')
const router = jsonServer.router(path.join(__dirname, '../json-server-simple/database.json'))

// multple route-files
// if there are multiple database files => for example to put each type into an own file you can to the following
// https://github.com/typicode/json-server/issues/367
// a more generic approach
// https://billyyyyy3320.com/en/2019/07/21/create-json-server-with-multiple-files/



// Set default middlewares (logger, static, cors and no-cache)
// middleware must be before router
// See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
    logger: true,
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

// make json-server delay all responses
/*
server.use(function(req, res, next){
    setTimeout(next, 10000);
});
*/

// example to add createAt
/*
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})
*/


// https://github.com/typicode/json-server#rewriter-example
// Add this before server.use(router)
/*
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
 */

// set routes => order is important, midlleware must be bevore router => therefore we add this at the end
server.use(router)

// start server
const port = config.port;
server.listen(port, () => {
    console.log(`JSON Server is running on ${port}`);
})

