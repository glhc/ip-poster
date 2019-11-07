'use strict';

const secrets = require('./secrets.js');
const http = require('http');
const https = require('https');

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
        updateIpAddress(ip.toString())
        console.log('Data received from ipify.org. IP address is:');
        console.log(ip);
      });
  });
}

function updateIpAddress(ipAddress) {
  let data = '';

  const options = {
    path: '/b/' + secrets.jsonBin.binId,
    method: 'put',
    headers: {
      "content-type": "application/json",
      "secret-key": secrets.jsonBin.secretkey,
      "versioning": false
    }
  };

  const req = https.request('https://jsonbin.io', options)
  req.write(ipAddress);
  req.end();

  req.on('error', function(err) {
    console.error('update of ip address failed.');
    throw new error(err);
  });

  

  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    if (data) {
      
    }
  });
};

getIpAddress();

exports.getIpAddress = getIpAddress;
exports.updateIpAddress = updateIpAddress;
