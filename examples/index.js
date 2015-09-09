'use strict';

var bunyan = require( 'bunyan' ),
	express = require( 'express' ),
	httpServer = require( './../lib' );

// Specify server options...
var opts = {
	'port': 7331,
	'maxport': 9999,
	'hostname': 'localhost'
};

// Create a logger...
var logger = bunyan.createLogger({
	'name': 'logger',
	'streams': [
		{
			'name': 'main',
			'level': 'info',
			'stream': process.stdout
		}
	]
});

// Create an express app:
var app = express();

// Create a function for creating an HTTP server...
var create = httpServer( opts, logger, app );

/**
* FUNCTION: done( error, server )
*	Callback invoked once a server is ready to receive HTTP requests.
*
* @param {Error|Null} error - error object
* @param {Server} server - server instance
* @returns {Void}
*/
function done( error, server ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Success!' );
	server.close();
}

// Create a server:
create( done );
