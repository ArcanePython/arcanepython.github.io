"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = require("fs");
const path_1 = require("path");
const port = 1234; // 😍
const mimeTypes = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.obj': 'text/plain',
    '.mat': 'text/plain',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.ttf': 'aplication/font-sfnt',
    '.eot': 'application/vnd.ms-fontobject',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff'
};
const server = (0, http_1.createServer)((request, response) => {
    var s = request.url;
    var iq = s.indexOf("?");
    if (iq >= 0)
        s = s.substring(0, iq);
    if (s == "/")
        s = "/index.html";
    var sext = (0, path_1.extname)(s);
    var b = (0, fs_1.existsSync)("." + s);
    const filestring = (!b) ? "" : (0, fs_1.readFileSync)("." + s);
    var mimeType = mimeTypes[sext] || 'application/octet-stream';
    console.log("GET [" + s + "] ext=[" + sext + "] mimetype=[" + mimeType + "]");
    response.writeHead(b ? 200 : 404, { 'Content-Type': mimeType });
    response.end(filestring);
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=wx.js.map