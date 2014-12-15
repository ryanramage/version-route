# version-route

Expose the package.json version and git info as a hapi route

```
npm install version-route
```

## Usage

``` js
var version = require('version-route')(__dirname)

server.route(version);

```

then you can get the version info of the app on path /v, eg

```

curl http://localhost:493/v

```


##options





## License

MIT
