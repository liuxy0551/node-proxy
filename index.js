let http = require('http');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer({});
let ports = require('./ports')

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  // 设置 Header
  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

for (let i of ports) {
  http.createServer(function(req, res) {
    proxy.web(req, res, {
      target: i.target
    });
  }).listen(i.port);

  console.log(`listening ${i.name} on port ${i.port}`);
}
