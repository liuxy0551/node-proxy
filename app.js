const http = require('http')
const proxy = require('http-proxy').createProxyServer({})
const ports = require('./ports')

for (let { target, port, hidden } of ports) {
  if (!hidden) {
    http.createServer((req, res) => {
      proxy.web(req, res, {
        target
      })
    }).listen(port)

    console.log(`listening ${ target } on port ${ port }`)
  }
}
