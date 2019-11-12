'use strict';

const secrets = require('./secrets.js');
const http = require('http');
const https = require('https');

const postData = '{"Sample": "Hello World"}';

async function main() {
  console.log('Hello! Welcome to the IP-Posting service.');
  getIpAddress()
    .then((ipAddress) => updateIpAddress(ipAddress))
    .then((data) => {console.log(data)})
    .catch((err) => {console.error(err)});
};


function getIpAddress() {
  return new Promise((resolve) => {
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function (resp) {
      resp.on('data', function (ip) {
    console.log('data: ');
        resolve(ip.toString());
      });
    });
  });
}

/*
 * Sends IP Address to JSONbin.io
 * @ipAddress {String} - Current IP address
 * 
 */
function updateIpAddress(ipAddress) {
  return new Promise(function (resolve, reject) {
    let data = '';

    let sendPackage = {
      home: ipAddress
    };

    const options = {
      hostname: 'api.jsonbin.io',
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
          reject(data);
        }
      });
    });

    req.write(JSON.stringify(sendPackage));
    req.end();

    req.on('error', function (err) {
      console.error('update of ip address failed.');
      console.log(err[1]);
      throw new error(err);
    });
  })
};

main();
exports.getIpAddress = getIpAddress;
exports.updateIpAddress = updateIpAddress;
