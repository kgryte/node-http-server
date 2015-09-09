'use strict';

// MODULES //

var http = require( 'http' );


// SERVER //

/**
* FUNCTION: createServer( port, done )
*	Creates a HTTP server.
*
* @param {Number} port - server port
* @param {Function} done - callback to invoke when a server is ready to receive HTTP requests
* @returns {Server} HTTP server
*/
function createServer( port, done ) {
	var server = http.createServer();
	server.listen( port, done );
	return server;
} // end FUNCTION createServer()


// EXPORTS //

module.exports = createServer;
