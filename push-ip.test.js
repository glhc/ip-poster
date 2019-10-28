'use strict';

const source = require('./push-ip.js');

test('Should return IP address as string', () => {
  expect(typeof source.doSomething()).toBe(String);
})
