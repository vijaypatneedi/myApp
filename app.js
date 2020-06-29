const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))





const user = require('./routes/user')
app.use('/user', user)




//PRACTICE METHODS FROM EXPRESS DOCUMENTATION
app.post('/', function (req, res) {
res.send('POST request to the homepage')
})

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
  })
app.get('/', function (req, res) {
res.send('Welcome to Pizza API')
})
app.get('/example/a', function (req, res) {
    res.send('Hello from A!')
  })

app.get('/users/:userId/books/:bookId', function (req, res) {
res.send(req.params)
})

app.get('/flights/:from-:to', function (req, res) {
    res.send(req.params)
})

app.get('/example/a', function (req, res) {
    res.send('Hello from A!')
  })


var cb0 = function (req, res, next) {
console.log('CB0')
next()
}

var cb1 = function (req, res, next) {
console.log('CB1')
next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
console.log('the response will be sent by the next function ...')
next()
}, function (req, res) {
res.send('Hello from D!')
})

app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
  }, function (req, res) {
    res.send('Hello from B!')
  })

app.route('/book')
.get(function (req, res) {
res.send('Get a random book')
})
.post(function (req, res) {
res.send('Add a book')
})
.put(function (req, res) {
res.send('Update the book')
})


//Export the app
module.exports = app;
