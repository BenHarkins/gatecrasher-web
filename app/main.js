require('bootstrap-webpack!./bootstrap.config.js');
var nav = require('./nav')
var layout = require('./layout')

var m = require('mithril')

var demo = require('./demo')

var layoutMixin = function(layout, nav, body)
{
	return function() {
		return layout(nav, body)
	}
}

var mixedIn = {}
mixedIn.controller = function() { }
mixedIn.view = layoutMixin(layout, nav, function() { return ['mixedin body'] })

var foo = {}
foo.view = layoutMixin(layout, nav, function() { return demo })

m.route.mode = "hash";
m.route(document.body, '/foo', {
	'/foo': foo,
	'/bar': mixedIn
})

//initialize
//m.mount(document.getElementById('app'), Demo)