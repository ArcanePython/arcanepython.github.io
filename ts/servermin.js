const http = require('http');http.createServer(function (request, response) {
  // Send HTTP headers and body with status 200 (meaning success)
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(`
    <html><body>
      <h1>Hallo, world!</h1>
      You asked for: ${request.url}
    </body></html>`);
}).listen(1234);
