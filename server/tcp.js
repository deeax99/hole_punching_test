var net = require('net');
var server = net.createServer();    
server.on('connection', handleConnection);
server.listen(9000, function() 
{    
    console.log('server listening to %j', server.address());  
});

A = null
B = null
function handleConnection(conn) 
{    
  if (!A)
  {
    A = conn
  }
  else if (!B)
  {
    B = conn
  }

  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
  console.log('new client connection from %s', remoteAddress);
  sendData();
}    
function sendData ()
{
  if (A && B)
  {
    aMessage = {address  : B.remoteAddress , port  : B.remotePort};
    bMessage = {address  : A.remoteAddress , port  : A.remotePort};
    A.write(JSON.stringify(aMessage)+'\0');
    B.write(JSON.stringify(bMessage)+'\0');
  }
}
function onConnData(d) 
{  
  console.log('connection data from %s: %j', remoteAddress, d);  
  conn.write(d);  
}