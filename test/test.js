/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	httpServer = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( '@kgryte/http-server', function tests() {

	it( 'should export a function', function test() {
		expect( httpServer ).to.be.a( 'function' );
	});

});
