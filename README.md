ie8-shims
=========

Compatibility shims for Internet Explorer 8 ( and potentially other browsers ).

## Installation

Install with [npm](https://www.npmjs.org/):

```
npm install [--save|--save-dev] ie8-shims.js
```

or with [Bower](http://bower.io/):

```
bower install --save ie8-shims.js
```

## Usage

### Array

* a_filter ( `Array.prototype.filter` )
* a_forEach ( `Array.prototype.forEach` )
* a_indexOf ( `Array.prototype.indexOf` )
* a_map ( `Array.prototype.map` )
* a_reduce ( `Array.prototype.forEach` )

### Object

* o_create ( `Object.create` )

### Event

* addEventListener ( `addEventListener` / `attachEvent` )
* removeEventListener ( `removeEventListener` / `detachEvent` )

## Build

Install [Node](http://nodejs.org)

```
npm install
npm build .
```

## Tests

I believe in miracles

There's one warning that we can't disable with jshint, grabbed from a
Mozilla polyfill.  Don't want to change `!=` to `!==` in a polyfill.
