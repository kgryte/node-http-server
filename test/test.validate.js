/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( i = 0; i < values.length; i++ ) {
			assert.isTrue( validate( {}, values[ i ] ) instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `port` option which is not a nonnegative integer', function test() {
		var values, err, i;

		values = [
			-5,
			Math.PI,
			'5',
			undefined,
			null,
			NaN,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'port': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `maxport` option which is not a nonnegative integer', function test() {
		var values, err, i;

		values = [
			-5,
			Math.PI,
			'5',
			undefined,
			null,
			NaN,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'maxport': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `hostname` option which is not a string primitive', function test() {
		var values, err, i;

		values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'hostname': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an `address` option which is not a string primitive', function test() {
		var values, err, i;

		values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'address': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return null if all options are valid', function test() {
		var err;

		err = validate( {}, {
			'port': 7331,
			'maxport': 9999,
			'hostname': 'localhost',
			'address': '127.0.0.1'
		});

		assert.isNull( err );

		err = validate( {}, {
			'beep': true, // misc options
			'boop': 'bop'
		});

		assert.isNull( err );
	});

});
