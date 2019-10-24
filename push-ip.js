'use strict';
// const secrets = require('./secrets.js');
const http = require('http');

const postData = '{"Sample": "Hello World"}';

async function main() {
  process.stdout.write('Hello! Welcome to the IP-Posting service.')
  req.write(postData);

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });
};


function getIpAddress() {
  http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
      resp.on('data', function(ip) {
        doSomething(ip.toString());
          });
  });
}

function postIpAddress(ipAddress) {
  const options = {
    hostname: 'www.jsonbin.io',
    port: 80,
    path: '/b/' + secrets.jsonBinId,
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "secret-key": secrets.secretKey,
    }
  };

  const req = http.request(options, (response) => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    response.on('end', () => {
      console.log('no more data.');
    });
  });
};

function doSomething(result) {
  console.log(result);
}

getIpAddress();
