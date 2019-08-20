let http = require('http');
let proxy = require('http-proxy').createProxyServer({});
let ports = require('./ports');

for (let i of ports) {
  if (!i.hidden) {
    http.createServer(function(req, res) {
      proxy.web(req, res, {
        target: i.target
      });
    }).listen(i.port);

    console.log(`listening ${i.name} on port ${i.port}`);
  }
}
