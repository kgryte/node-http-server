/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	http = require( 'http' ),
	noop = require( '@kgryte/noop' ),
	logger = require( './fixtures/logger.js' ),
	createServer = require( './fixtures/server.js' ),
	httpServer = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( '@kgryte/http-server', function tests() {

	var opts;

	beforeEach( function before() {
		opts = {};
	});

	it( 'should export a function', function test() {
		expect( httpServer ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided enough arguments', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			httpServer();
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			httpServer({
				'port': Math.PI
			}, logger );
		}
	});

	it( 'should throw an error if provided a request listener which is not a function', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			{}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				httpServer( opts, logger, value );
			};
		}
	});

	it( 'should return a function', function test() {
		expect( httpServer( opts, logger ) ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a callback which is not a function', function test() {
		var values,
			create,
			i;

		values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			{}
		];

		create = httpServer( opts, logger );

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				create( value );
			};
		}
	});

	it( 'should listen on a specified port', function test( done ) {
		var create;

		opts.port = 7331;
		create = httpServer( opts, logger );
		create( onServer );

		function onServer( error, server ) {
			if ( error ) {
				assert.ok( false );
			} else {
				assert.strictEqual( server.address().port, opts.port );
			}
			server.close();
			done();
		}
	});

	it( 'should throw if a server encounters an error', function test( done ) {
		var create,
			server;

		opts.port = 7331;

		create = httpServer( opts, logger );
		create( next );

		function next( error, s ) {
			server = s;
			expect( foo ).to.throw( Error );
			server.close();
			done();
		}

		function foo() {
			var err = new Error( 'Server error.' );
			server.emit( 'error', err );
		}
	});

	it( 'should throw if unable to listen on a specified port (default behavior)', function test( done ) {
		var create,
			server;

		opts.port = 7331;

		create = httpServer( opts, logger );
		create( next );

		function next( error, s ) {
			server = s;
			expect( foo ).to.throw( Error );
			server.close();
			done();
		}

		function foo() {
			var err = new Error( 'Server address already in use.' );
			err.code = 'EADDRINUSE';

			server.emit( 'error', err );
		}
	});

	it( 'should port hunt', function test( done ) {
		var create,
			eServer;

		opts.port = 7331;
		opts.maxport = 9999;

		create = httpServer( opts, logger );
		eServer = createServer( opts.port, next );

		function next() {
			create( onServer );
		}

		function onServer( error, server ) {
			if ( error ) {
				assert.notOk( true );
			} else {
				assert.strictEqual( server.address().port, opts.port+1 );
			}
			server.close();
			eServer.close();
			done();
		}
	});

	it( 'should listen on a specified hostname', function test( done ) {
		var create;

		opts.hostname = 'localhost';
		create = httpServer( opts, logger );
		create( onServer );

		function onServer( error, server ) {
			if ( error ) {
				assert.ok( false );
			} else {
				assert.strictEqual( server.address().address, '127.0.0.1' );
			}
			server.close();
			done();
		}
	});

	it( 'should listen on a specified address', function test( done ) {
		var create;

		opts.address = '127.0.0.1';
		create = httpServer( opts, logger );
		create( onServer );

		function onServer( error, server ) {
			if ( error ) {
				assert.ok( false );
			} else {
				assert.strictEqual( server.address().address, opts.address );
			}
			server.close();
			done();
		}
	});

	it( 'should use a provided request listener', function test( done ) {
		var create,
			server;

		opts.port = 7331;
		create = httpServer( opts, logger, onRequest );
		create( onServer );

		function onServer( error, s ) {
			if ( error ) {
				assert.ok( false );
			}
			server = s;
			http.get( 'http://127.0.0.1:7331', noop );
		}
		function onRequest() {
			assert.ok( true );
			server.close();
			done();
		}
	});

});
