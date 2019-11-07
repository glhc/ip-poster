'use strict';

const secrets = require('./secrets.js');
const source = require('./update-ip.js');

test('Should return IP address as string', () => {
  expect(typeof source.getIpAddress()).toBe(String);
})
