'use strict';

const source = require('./update-ip.js');

describe('getIpAddress', () => {
  test('should return a string', () => {
    expect(source.getIpAddress()).resolves.toBeInstanceOf(String);
  });
  
  test('should have four bullet points and only numbers', () => {
    expect(source.getIpAddress()).resolves.toMatch(/\d*\.\d*\.\d*.\d/)
  });
});

