let http = require('http');

let ipAddress = null;

function getIpAddress() {
  http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
      resp.on('data', function(ip) {
            ipAddress = ip;
          });
  });
}

function postIpAddress(ipAddress) {
  
};

if (ipAddress) {
  console.log(`IP Address: ${ipAddress});  
}
