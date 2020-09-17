# node-proxy



## 一、监听本地端口后转发，可同时监听多个本地端口

### 启动

```
node app.js
```

### ports.json

| 参数 | 含义 |
| :----: | :----: |
| target | 监听的链接（本地端口） |
| port | 监听请求并转发到本地的端口上 |
| hidden | 是(false)否(true)使用这条参数 |
