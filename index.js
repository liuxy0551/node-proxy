let http = require('http');
let proxy = require('http-proxy').createProxyServer({});
let ports = require('./ports');

// 解决跨域
proxy.on('proxyRes', function (proxyRes, req, res) {
  // res.setHeader('content-type', 'application/json;charset=utf-8');
  Object.keys(proxyRes.headers).forEach(key => {
    res.setHeader(key, proxyRes.headers[key]);
  })
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Proxy-Target, Content-Type, Authorization, Auth, Token, Access-Token, Access_Token, AccessToken, Code');
  proxyRes.pipe(res)
});

for (let i of ports) {
  if (!i.hidden) {
    http.createServer(function(req, res) {
      proxy.web(req, res, {
        target: i.target
      });
    }).listen(i.port);

    console.log(`listening ${i.target} on port ${i.port}`);
  }
}
