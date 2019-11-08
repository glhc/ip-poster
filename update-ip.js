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
        updateIpAddress(JSON.stringify(ip.toString()))
        console.log('Data received from ipify.org. IP address is:');
        console.log(JSON.stringify(ip.toString()));
      });
  });
}

function updateIpAddress(ipAddress) {
  return new Promise(function (resolve, reject) {
    let data = '';

    const options = {
      hostname: 'jsonbin.io',
      path: '/b/' + secrets.jsonBin.binId,
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        "secret-key": secrets.jsonBin.secretKey,
        "versioning": false
      }
    };

    const req = https.request(options, function (res) {
      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        if (data) {
          console.log('Response from jsonbin.io received:');
          console.log(data.statusCode);
          console.log(data);
          resolve(data);
        } else {
          throw new Error('No data recieved in body of jsonbin.io');
        }
      });
    });

    req.write(ipAddress);
    req.end();

    req.on('error', function (err) {
      console.error('update of ip address failed.');
      throw new error(err);
    });
  })
};

getIpAddress();

exports.getIpAddress = getIpAddress;
exports.updateIpAddress = updateIpAddress;
