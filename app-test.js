var http = require('http');

function in_gia_tri(res, chuoi){
    if(chuoi){
        console.log(JSON.parse(chuoi.toString()).bien);
    }
    res.writeHeader(200, {'Content-Type': 'application/json'});
    res.write('{"data": "HELLO world}');
    res.end();
}

http.createServer((req, res) => {
    // console.log(req);
    var data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
    })

    req.on('end', () => {
        if(req.url == '/'){
            if(req.method == 'GET'){
                in_gia_tri(res);
            }
            else if(req.method == 'POST'){
                in_gia_tri(res, data.toString());
            }
        }
        else{}
    })
}).listen(4000);