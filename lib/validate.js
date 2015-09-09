'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	isString = require( 'validate.io-string-primitive' ),
	isObject = require( 'validate.io-object' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - function options
* @param {Number} [options.port] - server port
* @param {Number} [options.maxport] - max server port
* @param {String} [options.hostname] - server hostname
* @param {String} [options.address] - server address
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'port' ) ) {
		opts.port = options.port;
		if ( !isNonNegativeInteger( opts.port ) ) {
			return new TypeError( 'invalid option. Port must be a nonnegative integer. Option: `' + opts.port + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'maxport' ) ) {
		opts.maxport = options.maxport;
		if ( !isNonNegativeInteger( opts.maxport ) ) {
			return new TypeError( 'invalid option. Max port option must be a nonnegative integer. Option: `' + opts.maxport + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'hostname' ) ) {
		opts.hostname = options.hostname;
		if ( !isString( opts.hostname ) ) {
			return new TypeError( 'invalid option. Hostname must be a primitive string. Option: `' + opts.hostname + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'address' ) ) {
		opts.address = options.address;
		if ( !isString( opts.address ) ) {
			return new TypeError( 'invalid option. Address must be a primitive string. Option: `' + opts.address + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
