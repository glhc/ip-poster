'use strict';

const http = require('http');
const https = require('https');

let options = {
  hostname: 'www.jsonbin.io',
  path: '/b/'
}

function createBinJsonBin(options) {
  return new Promise((resolve, reject) => {
    https.request(options, 
  })
}
